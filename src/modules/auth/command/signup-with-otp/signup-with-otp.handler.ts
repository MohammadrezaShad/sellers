import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import * as argon2 from 'argon2';

import { SigninOutput } from '@/modules/auth/dto/signin.dto';
import { TokenHelper } from '@/modules/auth/utils/token.helper';
import { CreateUserWithOtpCommand } from '@/modules/user/command/create-user-with-otp/create-user-with-otp.command';
import { UserModel } from '@/modules/user/model/user.model';
import { BadRequestException } from '@nestjs/common';
import { OtpModel } from '../../components/otp/model/otp.model';
import { FindOtpByPhoneQuery } from '../../components/otp/query/find-otp-by-phone/find-otp-by-phone.query';
import { ENTERED_CODE_IS_INCORRECT } from '../../constants/error-message.constant';
import { SignupWithOtpCommand } from './signup-with-otp.command';

@CommandHandler(SignupWithOtpCommand)
export class SignupWithOtpHandler
  implements ICommandHandler<SignupWithOtpCommand>
{
  constructor(
    private readonly tokenHelper: TokenHelper,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({ phone, code }: SignupWithOtpCommand): Promise<SigninOutput> {
    const otp: OtpModel = await this.queryBus.execute(
      new FindOtpByPhoneQuery(phone),
    );

    if (code !== otp?.getCode())
      throw new BadRequestException(ENTERED_CODE_IS_INCORRECT);

    const newUser: UserModel = await this.commandBus.execute(
      new CreateUserWithOtpCommand(phone),
    );
    const { accessToken, refreshToken } = await this.tokenHelper.getTokens(
      newUser.getId(),
      newUser.getPhone(),
    );
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.tokenHelper.updateRefreshToken(newUser.getId(), [
      hashedRefreshToken,
    ]);
    return {
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
