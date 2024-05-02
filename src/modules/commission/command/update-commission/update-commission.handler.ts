import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateCommissionCommand } from './update-commission.command';
import { CommissionRepository } from '../../commission.repository';

@CommandHandler(UpdateCommissionCommand)
export class UpdateCommissionHandler
  implements ICommandHandler<UpdateCommissionCommand>
{
  constructor(private readonly commissionRepository: CommissionRepository) {}

  async execute(command: UpdateCommissionCommand) {
    const { updateCommissionInput } = command;
    await this.commissionRepository.update(updateCommissionInput);
  }
}
