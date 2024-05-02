import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CommissionRepository } from '../../commission.repository';
import { DeleteCommissionCommand } from './delete-commission.command';

@CommandHandler(DeleteCommissionCommand)
export class DeleteCommissionHandler
  implements ICommandHandler<DeleteCommissionCommand>
{
  constructor(private readonly commissionRepository: CommissionRepository) {}

  async execute(command: DeleteCommissionCommand) {
    const { deleteCommissionInput } = command;
    try {
      await this.commissionRepository.delete(deleteCommissionInput);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
