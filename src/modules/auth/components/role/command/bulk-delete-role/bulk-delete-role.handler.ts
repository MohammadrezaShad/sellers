import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BulkDeleteRoleCommand } from '@/modules/auth/components/role/command/bulk-delete-role/bulk-delete-role.command';
import { DeleteRoleCommand } from '@/modules/auth/components/role/command/delete-role/delete-role.command';
import { ROLE_IS_USED } from '@/modules/auth/components/role/constant/error-message.constant';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';
import { FindUsersByRoleUseCase } from '@/modules/user/use-case/find-users-by-role.use-case';

@CommandHandler(BulkDeleteRoleCommand)
export class BulkDeleteRoleHandler
  implements ICommandHandler<BulkDeleteRoleCommand>
{
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userUseCase: FindUsersByRoleUseCase,
  ) {}

  async execute(command: BulkDeleteRoleCommand) {
    const { bulkDeleteRoleInput } = command;

    for (const roleId of bulkDeleteRoleInput.ids) {
      const users = await this.userUseCase.findUsersByRole({
        roleId: roleId,
      });
      if (users.results.length) throw new BadRequestException(ROLE_IS_USED);
    }

    await this.roleRepository.bulkDelete(bulkDeleteRoleInput.ids);
  }
}
