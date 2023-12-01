// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdatePasswordCommand } from '@/modules/user/command/update-password/update-password.command';
import {
  UpdatePasswordInput,
  UpdateUserOutput,
} from '@/modules/user/dto/update-user.dto';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async updatePassword({
    userId,
    password,
  }: UpdatePasswordInput): Promise<UpdateUserOutput> {
    try {
      await this.commandBus.execute(
        new UpdatePasswordCommand(userId, password),
      );
      return {
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
