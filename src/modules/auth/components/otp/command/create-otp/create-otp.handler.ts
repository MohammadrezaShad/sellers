import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';

import { OTP_ALREADY_EXISTS } from '../../constant/error-message.constant';
import { OtpModelFactory } from '../../model/otp-model.factory';
import { OtpModel } from '../../model/otp.model';
import { CreateOtpCommand } from './create-otp.command';
import { FindOtpByPhoneQuery } from '../../query/find-otp-by-phone/find-otp-by-phone.query';

@CommandHandler(CreateOtpCommand)
export class CreateOtpHandler implements ICommandHandler<CreateOtpCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly otpModelFactory: OtpModelFactory,
  ) {}

  async execute(command: CreateOtpCommand) {
    const { createOtpInput } = command;

    const otp: OtpModel = await this.queryBus.execute(
      new FindOtpByPhoneQuery(createOtpInput.phone),
    );
    if (otp) {
      throw new BadRequestException(OTP_ALREADY_EXISTS);
    }

    await this.otpModelFactory.create(createOtpInput);
  }
}
