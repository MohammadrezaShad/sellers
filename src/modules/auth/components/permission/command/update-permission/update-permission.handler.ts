import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';

import { UpdatePermissionCommand } from '@/modules/auth/components/permission/command/update-permission/update-permission.command';
import { PERMISSION_ALREADY_EXISTS } from '@/modules/auth/components/permission/constant/error-message.constant';
import { PermissionModel } from '@/modules/auth/components/permission/model/permission.model';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';
import { FindPermissionByNameQuery } from '@/modules/auth/components/permission/query/find-permission-by-name/find-permission-by-name.query';

@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionHandler
  implements ICommandHandler<UpdatePermissionCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async execute(command: UpdatePermissionCommand) {
    const { updatePermissionInput } = command;

    const permission: PermissionModel = await this.queryBus.execute(
      new FindPermissionByNameQuery(updatePermissionInput.name),
    );
    if (permission) {
      throw new BadRequestException(PERMISSION_ALREADY_EXISTS);
    }

    await this.permissionRepository.update(updatePermissionInput);
  }
}
