// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteOtpCommand } from '../command/delete-otp/delete-otp.command';
import { DeleteOtpInput, DeleteOtpOutput } from '../dto/delete-otp.dto';

@Injectable()
export class DeleteOtpUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async deleteOtp(input: DeleteOtpInput): Promise<DeleteOtpOutput> {
    try {
      await this.commandBus.execute(new DeleteOtpCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
