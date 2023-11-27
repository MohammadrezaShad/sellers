import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteRoleCommand } from '@/modules/auth/components/role/command/delete-role/delete-role.command';
import { ROLE_IS_USED } from '@/modules/auth/components/role/constant/error-message.constant';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';
import { FindUsersByRoleUseCase } from '@/modules/user/use-case/find-users-by-role.use-case';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userUseCase: FindUsersByRoleUseCase,
  ) {}

  async execute(command: DeleteRoleCommand) {
    const { deleteRoleInput } = command;
    const users = await this.userUseCase.findUsersByRole({
      roleId: deleteRoleInput.roleId,
    });
    if (users.results.length) throw new BadRequestException(ROLE_IS_USED);
    await this.roleRepository.delete(deleteRoleInput);
  }
}
