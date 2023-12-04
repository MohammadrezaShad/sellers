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
import { CoreOutput } from '@/common/dtos/output.dto';
import { SetPasswordInput } from '../dto/pass-recovery.dto';
import { DeleteOtpCommand } from '../components/otp/command/delete-otp/delete-otp.command';

@Injectable()
export class SetPasswordUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async setPassword({
    phone,
    verificationCode,
    password,
  }: SetPasswordInput): Promise<CoreOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindUserByPhoneQuery(phone),
      );
      if (!user) throw new NotFoundException('Phone not found');

      const otp: OtpModel = await this.queryBus.execute(
        new FindOtpByPhoneQuery(phone),
      );

      if (verificationCode !== otp?.getCode())
        throw new BadRequestException(ENTERED_CODE_IS_INCORRECT);

      await this.commandBus.execute(
        new UpdatePasswordCommand(user.getId(), password),
      );

      await this.commandBus.execute(new DeleteOtpCommand({ id: otp.getId() }));
      return {
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
