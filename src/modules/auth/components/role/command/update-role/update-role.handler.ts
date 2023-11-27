import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';

import { UpdateRoleCommand } from '@/modules/auth/components/role/command/update-role/update-role.command';
import { ROLE_ALREADY_EXISTS } from '@/modules/auth/components/role/constant/error-message.constant';
import { RoleModel } from '@/modules/auth/components/role/model/role.model';
import { FindRoleByNameQuery } from '@/modules/auth/components/role/query/find-role-by-name/find-role-by-name-query';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(command: UpdateRoleCommand) {
    const { updateRoleInput } = command;

    const role: RoleModel = await this.queryBus.execute(
      new FindRoleByNameQuery(updateRoleInput.name),
    );
    if (role) {
      throw new BadRequestException(ROLE_ALREADY_EXISTS);
    }

    await this.roleRepository.update(updateRoleInput);
  }
}
