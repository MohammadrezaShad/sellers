import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateSellerCommand } from './update-seller.command';
import { SellerRepository } from '../../seller.repository';

@CommandHandler(UpdateSellerCommand)
export class UpdateSellerHandler
  implements ICommandHandler<UpdateSellerCommand>
{
  constructor(private readonly sellerRepository: SellerRepository) {}

  async execute(command: UpdateSellerCommand) {
    const { updateSellerInput } = command;
    await this.sellerRepository.update(updateSellerInput);
  }
}
