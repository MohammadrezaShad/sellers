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
import { UpdatePasswordCommand } from '@/modules/user/command/update-password/update-password.command';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByPhoneQuery } from '@/modules/user/query/find-user-by-phone/find-user-by-phone.query';

import {
  PassRecoveryOutput,
  PassRecoveryWithPhoneInput,
} from '../dto/pass-recovery.dto';

@Injectable()
export class PassRecoveryWithPhoneUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async passRecoveryWithPhone({
    phone,
    code,
    password,
  }: PassRecoveryWithPhoneInput): Promise<PassRecoveryOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindUserByPhoneQuery(phone),
      );
      if (!user) throw new NotFoundException('Phone not found');

      const otp: OtpModel = await this.queryBus.execute(
        new FindOtpByPhoneQuery(phone),
      );

      if (code !== otp?.getCode())
        throw new BadRequestException(ENTERED_CODE_IS_INCORRECT);

      await this.commandBus.execute(
        new UpdatePasswordCommand(user.getId(), password),
      );

      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
