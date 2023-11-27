// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BulkDeletePermissionCommand } from '@/modules/auth/components/Permission/command/bulk-delete-Permission/bulk-delete-Permission.command';
import {
  BulkDeletePermissionInput,
  DeletePermissionOutput,
} from '@/modules/auth/components/permission/dto/delete-permission.dto';

@Injectable()
export class BulkDeletePermissionUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async bulkDeletePermission(
    input: BulkDeletePermissionInput,
  ): Promise<DeletePermissionOutput> {
    try {
      await this.commandBus.execute(new BulkDeletePermissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
