// user-registration.use-case.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { CoreOutput } from '@/common/dtos/output.dto';
import { OtpModel } from '../components/otp/model/otp.model';
import { FindOtpByPhoneQuery } from '../components/otp/query/find-otp-by-phone/find-otp-by-phone.query';
import { ENTERED_CODE_IS_INCORRECT } from '../constants/error-message.constant';
import { ValidateVerificationCodeInput } from '../dto/pass-recovery.dto';

@Injectable()
export class ValidateVerificationCodeUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async validateVerificationCode({
    phone,
    code,
  }: ValidateVerificationCodeInput): Promise<CoreOutput> {
    try {
      const otp: OtpModel = await this.queryBus.execute(
        new FindOtpByPhoneQuery(phone),
      );

      if (code !== otp?.getCode())
        throw new BadRequestException(ENTERED_CODE_IS_INCORRECT);

      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
