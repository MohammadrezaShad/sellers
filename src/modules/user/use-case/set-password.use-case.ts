// user-registration.use-case.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { UpdatePasswordCommand } from '@/modules/user/command/update-password/update-password.command';
import {
  SetPasswordInput,
  UpdatePasswordInput,
  UpdateUserOutput,
} from '@/modules/user/dto/update-user.dto';
import { FindUserByPhoneQuery } from '../query/find-user-by-phone/find-user-by-phone.query';
import { FindOtpByPhoneQuery } from '@/modules/auth/components/otp/query/find-otp-by-phone/find-otp-by-phone.query';
import { OtpModel } from '@/modules/auth/components/otp/model/otp.model';
import { ENTERED_CODE_IS_INCORRECT } from '@/modules/auth/constants/error-message.constant';
import { UserModel } from '../model/user.model';

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
  }: SetPasswordInput): Promise<UpdateUserOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindUserByPhoneQuery(phone),
      );
      if (!user) throw new NotFoundException('Phone not found');

      const codeObject: OtpModel = await this.queryBus.execute(
        new FindOtpByPhoneQuery(phone),
      );

      if (verificationCode !== codeObject?.getCode())
        throw new BadRequestException(ENTERED_CODE_IS_INCORRECT);

      await this.commandBus.execute(
        new UpdatePasswordCommand(user.getId(), password),
      );
      return {
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}