import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateOtpCommand } from '../command/create-otp/create-otp.command';
import { CreateOtpInput, CreateOtpOutput } from '../dto/create-otp.dto';

@Injectable()
export class CreateOtpUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async createOtp(input: CreateOtpInput): Promise<CreateOtpOutput> {
    try {
      await this.commandBus.execute(new CreateOtpCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
