// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateRoleCommand } from '@/modules/auth/components/role/command/update-role/update-role.command';
import {
  UpdateRoleInput,
  UpdateRoleOutput,
} from '@/modules/auth/components/role/dto/update-role.dto';

@Injectable()
export class UpdateRoleUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async updateRole(input: UpdateRoleInput): Promise<UpdateRoleOutput> {
    try {
      await this.commandBus.execute(new UpdateRoleCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
