import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateRoleCommand } from '@/modules/auth/components/role/command/create-role/create-role.command';
import {
  CreateRoleInput,
  CreateRoleOutput,
} from '@/modules/auth/components/role/dto/create-role.dto';

@Injectable()
export class CreateRoleUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async createRole(input: CreateRoleInput): Promise<CreateRoleOutput> {
    try {
      await this.commandBus.execute(new CreateRoleCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
