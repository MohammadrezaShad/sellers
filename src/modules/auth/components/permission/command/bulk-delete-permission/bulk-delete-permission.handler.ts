import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import Permission from '@/common/permissions/permisison.type';
import { BulkDeletePermissionCommand } from '@/modules/auth/components/Permission/command/bulk-delete-Permission/bulk-delete-Permission.command';
import { PERMISSION_IS_USED } from '@/modules/auth/components/permission/constant/error-message.constant';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';

@CommandHandler(BulkDeletePermissionCommand)
export class BulkDeletePermissionHandler
  implements ICommandHandler<BulkDeletePermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(command: BulkDeletePermissionCommand) {
    const { bulkDeletePermissionInput } = command;

    for (const permissionId of bulkDeletePermissionInput.ids) {
      const dbPermission = await this.permissionRepository.findById({
        id: permissionId,
      });
      Object.keys(Permission).map(permissionName => {
        if (permissionName === dbPermission.getName())
          throw new BadRequestException(PERMISSION_IS_USED);
      });
    }

    await this.permissionRepository.bulkDelete(bulkDeletePermissionInput.ids);
  }
}
