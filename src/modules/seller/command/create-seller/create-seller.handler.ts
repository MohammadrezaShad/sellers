import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SellerModelFactory } from '../../model/seller-model.factory';
import { CreateSellerCommand } from './create-seller.command';

@CommandHandler(CreateSellerCommand)
export class CreateSellerHandler
  implements ICommandHandler<CreateSellerCommand>
{
  constructor(private readonly sellerModelFactory: SellerModelFactory) {}

  async execute(command: CreateSellerCommand) {
    const { createSellerInput } = command;
    await this.sellerModelFactory.create(createSellerInput);
  }
}
