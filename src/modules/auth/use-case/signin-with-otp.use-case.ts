// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  SigninOutput,
  SigninWithOtpInput,
} from '@/modules/auth/dto/signin.dto';
import { SigninWithOtpQuery } from '../query/signin-with-otp/signin-with-otp.query';

@Injectable()
export class SigninWithOtpUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async signinWithOtp({
    phone,
    code,
  }: SigninWithOtpInput): Promise<SigninOutput> {
    try {
      const object = await this.queryBus.execute(
        new SigninWithOtpQuery(phone, code),
      );
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
