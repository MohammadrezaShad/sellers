import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';

import { CreatePermissionCommand } from '@/modules/auth/components/permission/command/create-permission/create-permission.command';
import { PERMISSION_ALREADY_EXISTS } from '@/modules/auth/components/permission/constant/error-message.constant';
import { PermissionModel } from '@/modules/auth/components/permission/model/permission.model';
import { PermissionModelFactory } from '@/modules/auth/components/permission/model/permission-model.factory';
import { FindPermissionByNameQuery } from '@/modules/auth/components/permission/query/find-permission-by-name/find-permission-by-name.query';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler
  implements ICommandHandler<CreatePermissionCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly permissionModelFactory: PermissionModelFactory,
  ) {}

  async execute(command: CreatePermissionCommand) {
    const { createPermissionInput } = command;

    const permission: PermissionModel = await this.queryBus.execute(
      new FindPermissionByNameQuery(createPermissionInput.name),
    );
    if (permission) {
      throw new BadRequestException(PERMISSION_ALREADY_EXISTS);
    }

    await this.permissionModelFactory.create(createPermissionInput);
  }
}
