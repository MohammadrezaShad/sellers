import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CommissionRepository } from '../../commission.repository';
import { BulkDeleteCommissionCommand } from './bulk-delete-commission.command';

@CommandHandler(BulkDeleteCommissionCommand)
export class BulkDeleteCommissionHandler
  implements ICommandHandler<BulkDeleteCommissionCommand>
{
  constructor(private readonly commissionRepository: CommissionRepository) {}
  async execute(command: BulkDeleteCommissionCommand) {
    const { bulkDeleteCommissionInput } = command;
    try {
      await this.commissionRepository.bulkDelete(bulkDeleteCommissionInput.ids);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
