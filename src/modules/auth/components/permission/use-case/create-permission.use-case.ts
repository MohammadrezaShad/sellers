import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreatePermissionCommand } from '@/modules/auth/components/permission/command/create-permission/create-permission.command';
import {
  CreatePermissionInput,
  CreatePermissionOutput,
} from '@/modules/auth/components/permission/dto/create-permission.dto';

@Injectable()
export class CreatePermissionUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async createPermission(
    input: CreatePermissionInput,
  ): Promise<CreatePermissionOutput> {
    try {
      await this.commandBus.execute(new CreatePermissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
