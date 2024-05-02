import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SellerRepository } from '../../seller.repository';
import { BulkDeleteSellerCommand } from './bulk-delete-seller.command';

@CommandHandler(BulkDeleteSellerCommand)
export class BulkDeleteSellerHandler
  implements ICommandHandler<BulkDeleteSellerCommand>
{
  constructor(private readonly sellerRepository: SellerRepository) {}
  async execute(command: BulkDeleteSellerCommand) {
    const { bulkDeleteSellerInput } = command;
    try {
      await this.sellerRepository.bulkDelete(bulkDeleteSellerInput.ids);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
