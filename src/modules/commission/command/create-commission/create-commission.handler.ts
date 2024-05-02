import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CommissionModelFactory } from '../../model/commission-model.factory';
import { CreateCommissionCommand } from './create-commission.command';

@CommandHandler(CreateCommissionCommand)
export class CreateCommissionHandler
  implements ICommandHandler<CreateCommissionCommand>
{
  constructor(
    private readonly commissionModelFactory: CommissionModelFactory,
  ) {}

  async execute(command: CreateCommissionCommand) {
    const { createCommissionInput } = command;
    await this.commissionModelFactory.create(createCommissionInput);
  }
}
