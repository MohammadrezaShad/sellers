// user-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  SigninOutput,
  SigninWithOtpInput,
} from '@/modules/auth/dto/signin.dto';
import { SigninWithOtpQuery } from '../query/signin-with-otp/signin-with-otp.query';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByPhoneAndIsVerifiedQuery } from '@/modules/user/query/find-user-by-phone-and-is-verified/find-user-by-phone-and-is-verified.query';
import { CoreOutput } from '@/common/dtos/output.dto';

@Injectable()
export class SigninWithOtpUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async signinWithOtp({
    phone,
    code,
  }: SigninWithOtpInput): Promise<CoreOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindUserByPhoneAndIsVerifiedQuery(phone),
      );
      if (!user) throw new NotFoundException('User not found');

      // generate code and send code with sms to input phone
      // for now use fake code
      const fakeCode = 2244;

      // const object = await this.queryBus.execute(
      //   new SigninWithOtpQuery(phone, code),
      // );
      return {
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
