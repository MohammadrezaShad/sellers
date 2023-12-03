// user-registration.use-case.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { SignupWithPhoneCommand } from '../command/signup-with-phone/signup-with-phone.command';
import { CreateOtpCommand } from '../components/otp/command/create-otp/create-otp.command';
import { SignupWithPhoneInput, SignupWithPhoneOutput } from '../dto/signup.dto';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByPhoneQuery } from '@/modules/user/query/find-user-by-phone/find-user-by-phone.query';

@Injectable()
export class SignupWithPhoneUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async signupWithPhone({
    phone,
  }: SignupWithPhoneInput): Promise<SignupWithPhoneOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindUserByPhoneQuery(phone),
      );

      if (user && user.getIsVerified()) {
        throw new BadRequestException('this phone number is exists');
      } else if (user && !user.getIsVerified()) {
        // generate code and send code with sms to input phone
        // for now use fake code
        const fakeCode = 2244;
        await this.commandBus.execute(
          new CreateOtpCommand({ phone: phone, code: fakeCode }),
        );
      } else {
        await this.commandBus.execute(new SignupWithPhoneCommand(phone));
        // generate code and send code with sms to input phone
        // for now use fake code
        const fakeCode = 2233;
        await this.commandBus.execute(
          new CreateOtpCommand({ phone: phone, code: fakeCode }),
        );
      }
      return {
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
