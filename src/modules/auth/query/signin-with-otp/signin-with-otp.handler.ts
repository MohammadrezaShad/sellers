import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import * as argon2 from 'argon2';

import { SigninOutput } from '@/modules/auth/dto/signin.dto';
import { TokenHelper } from '@/modules/auth/utils/token.helper';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByPhoneQuery } from '@/modules/user/query/find-user-by-phone/find-user-by-phone.query';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OtpModel } from '../../components/otp/model/otp.model';
import { FindOtpByPhoneQuery } from '../../components/otp/query/find-otp-by-phone/find-otp-by-phone.query';
import { SigninWithOtpQuery } from './signin-with-otp.query';
import {
  ENTERED_CODE_IS_INCORRECT,
  NO_ACCOUNT_WITH_THIS_NUMBER,
} from '../../constants/error-message.constant';

@QueryHandler(SigninWithOtpQuery)
export class SigninWithOtpHandler implements IQueryHandler<SigninWithOtpQuery> {
  constructor(
    private readonly tokenHelper: TokenHelper,
    private readonly queryBus: QueryBus,
  ) {}

  async execute({ phone, code }: SigninWithOtpQuery): Promise<SigninOutput> {
    const otp: OtpModel = await this.queryBus.execute(
      new FindOtpByPhoneQuery(phone),
    );

    if (code !== otp?.getCode())
      throw new BadRequestException(ENTERED_CODE_IS_INCORRECT);

    const user: UserModel = await this.queryBus.execute(
      new FindUserByPhoneQuery(phone),
    );

    if (!user) throw new NotFoundException(NO_ACCOUNT_WITH_THIS_NUMBER);

    const { accessToken, refreshToken } = await this.tokenHelper.getTokens(
      user.getId(),
      user.getPhone(),
    );

    const hashedRefreshToken = await argon2.hash(refreshToken);

    const userRefreshToken = user.getRefreshTokens();

    if (userRefreshToken.length == 3) userRefreshToken.shift();

    userRefreshToken.push(hashedRefreshToken);

    await this.tokenHelper.updateRefreshToken(user.getId(), userRefreshToken);
    return {
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
