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
import { generateOTP } from '@/common/utils/generate-otp.util';

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

      const code = generateOTP();

      if (user && user.getIsVerified()) {
        throw new BadRequestException('this phone number is exists');
      } else if (user && !user.getIsVerified()) {
        await this.commandBus.execute(
          new CreateOtpCommand({ phone: phone, code: code }),
        );
      } else {
        await this.commandBus.execute(new SignupWithPhoneCommand(phone));

        await this.commandBus.execute(
          new CreateOtpCommand({ phone: phone, code: code }),
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
