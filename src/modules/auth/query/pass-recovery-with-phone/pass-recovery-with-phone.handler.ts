import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';

import { OtpModel } from '../../components/otp/model/otp.model';
import { FindOtpByPhoneQuery } from '../../components/otp/query/find-otp-by-phone/find-otp-by-phone.query';
import { PassRecoveryOutput } from '../../dto/pass-recovery.dto';
import { PassRecoveryWithPhoneQuery } from './pass-recovery-with-phone.query';
import { ENTERED_CODE_IS_INCORRECT } from '../../constants/error-message.constant';

@QueryHandler(PassRecoveryWithPhoneQuery)
export class PassRecoveryWithPhoneHandler
  implements IQueryHandler<PassRecoveryWithPhoneQuery>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute({
    phone,
    code,
  }: PassRecoveryWithPhoneQuery): Promise<PassRecoveryOutput> {
    const otp: OtpModel = await this.queryBus.execute(
      new FindOtpByPhoneQuery(phone),
    );

    if (code !== otp?.getCode())
      throw new BadRequestException(ENTERED_CODE_IS_INCORRECT);

    return {
      success: true,
    };
  }
}
