// user-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CreateOtpCommand } from '@/modules/auth/components/otp/command/create-otp/create-otp.command';
import { USER_NOT_FOUND } from '@/modules/auth/constants/error-message.constant';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByPhoneAndIsVerifiedQuery } from '@/modules/user/query/find-user-by-phone-and-is-verified/find-user-by-phone-and-is-verified.query';

import { SendPassRecoverySmsInput } from '../dto/pass-recovery.dto';

@Injectable()
export class SendPassRecoverySmsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async sendPassRecoverySms({
    phone,
  }: SendPassRecoverySmsInput): Promise<CoreOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindUserByPhoneAndIsVerifiedQuery(phone),
      );
      if (!user) throw new NotFoundException(USER_NOT_FOUND);

      // generate code and send code with sms to input phone
      // for now use fake code

      const fakeCode = 2244;
      await this.commandBus.execute(
        new CreateOtpCommand({ phone: phone, code: fakeCode }),
      );

      //   const output: PassRecoveryOutput = await this.queryBus.execute(
      //     new PassRecoveryWithPhoneQuery(phone, code),
      //   );
      return {
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
