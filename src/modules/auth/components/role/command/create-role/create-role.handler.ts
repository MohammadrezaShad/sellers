import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';

import { CreateRoleCommand } from '@/modules/auth/components/role/command/create-role/create-role.command';
import { ROLE_ALREADY_EXISTS } from '@/modules/auth/components/role/constant/error-message.constant';
import { RoleModel } from '@/modules/auth/components/role/model/role.model';
import { RoleModelFactory } from '@/modules/auth/components/role/model/role-model.factory';
import { FindRoleByNameQuery } from '@/modules/auth/components/role/query/find-role-by-name/find-role-by-name-query';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly roleModelFactory: RoleModelFactory,
  ) {}

  async execute(command: CreateRoleCommand) {
    const { createRoleInput } = command;

    const role: RoleModel = await this.queryBus.execute(
      new FindRoleByNameQuery(createRoleInput.name),
    );
    if (role) {
      throw new BadRequestException(ROLE_ALREADY_EXISTS);
    }

    await this.roleModelFactory.create(createRoleInput);
  }
}
