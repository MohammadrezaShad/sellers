// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdatePermissionCommand } from '@/modules/auth/components/permission/command/update-permission/update-permission.command';
import {
  UpdatePermissionInput,
  UpdatePermissionOutput,
} from '@/modules/auth/components/permission/dto/update-permission.dto';

@Injectable()
export class UpdatePermissionUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async updatePermission(
    input: UpdatePermissionInput,
  ): Promise<UpdatePermissionOutput> {
    try {
      await this.commandBus.execute(new UpdatePermissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
