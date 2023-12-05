// user-registration.use-case.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { OtpModel } from '@/modules/auth/components/otp/model/otp.model';
import { FindOtpByPhoneQuery } from '@/modules/auth/components/otp/query/find-otp-by-phone/find-otp-by-phone.query';
import { ENTERED_CODE_IS_INCORRECT } from '@/modules/auth/constants/error-message.constant';
import { SigninOutput, SigninWitOtpInput } from '@/modules/auth/dto/signin.dto';
import { SigninWithOtpQuery } from '@/modules/auth/query/signin-with-otp/signin-with-otp.query';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByPhoneQuery } from '@/modules/user/query/find-user-by-phone/find-user-by-phone.query';

import { DeleteOtpCommand } from '../components/otp/command/delete-otp/delete-otp.command';

@Injectable()
export class SigninWithOtpUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async signinWithOtp({
    phone,
    code,
  }: SigninWitOtpInput): Promise<SigninOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindUserByPhoneQuery(phone),
      );
      if (!user) throw new NotFoundException('Phone not found');

      const otp: OtpModel = await this.queryBus.execute(
        new FindOtpByPhoneQuery(phone),
      );

      const isValid = code && (await otp.validateCode(code));

      if (!isValid) throw new BadRequestException(ENTERED_CODE_IS_INCORRECT);

      const object = await this.queryBus.execute(new SigninWithOtpQuery(phone));

      await this.commandBus.execute(new DeleteOtpCommand({ id: otp.getId() }));

      return {
        success: true,
        accessToken: object.accessToken,
        refreshToken: object.refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
