// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  PassRecoveryWithPhoneInput,
  PassRecoveryOutput,
} from '../dto/pass-recovery.dto';
import { PassRecoveryWithPhoneQuery } from '../query/pass-recovery-with-phone/pass-recovery-with-phone.query';

@Injectable()
export class PassRecoveryWithPhoneUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async passRecoveryWithPhone({
    phone,
    code,
  }: PassRecoveryWithPhoneInput): Promise<PassRecoveryOutput> {
    try {
      const output: PassRecoveryOutput = await this.queryBus.execute(
        new PassRecoveryWithPhoneQuery(phone, code),
      );
      return output;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
