// user-registration.use-case.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { OtpModel } from '@/modules/auth/components/otp/model/otp.model';
import { FindOtpByPhoneQuery } from '@/modules/auth/components/otp/query/find-otp-by-phone/find-otp-by-phone.query';
import { ENTERED_CODE_IS_INCORRECT } from '@/modules/auth/constants/error-message.constant';
import {
  SendSigninWitOtpInput,
  SigninOutput,
} from '@/modules/auth/dto/signin.dto';
import { SigninWithOtpQuery } from '@/modules/auth/query/signin-with-otp/signin-with-otp.query';

@Injectable()
export class SigninWithOtpUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async signinWithOtp({
    phone,
    code,
  }: SendSigninWitOtpInput): Promise<SigninOutput> {
    try {
      const otp: OtpModel = await this.queryBus.execute(
        new FindOtpByPhoneQuery(phone),
      );

      if (code !== otp?.getCode())
        throw new BadRequestException(ENTERED_CODE_IS_INCORRECT);

      const object = await this.queryBus.execute(new SigninWithOtpQuery(phone));

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
