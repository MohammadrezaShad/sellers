import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SellerRepository } from '../../seller.repository';
import { DeleteSellerCommand } from './delete-seller.command';

@CommandHandler(DeleteSellerCommand)
export class DeleteSellerHandler
  implements ICommandHandler<DeleteSellerCommand>
{
  constructor(private readonly sellerRepository: SellerRepository) {}

  async execute(command: DeleteSellerCommand) {
    const { deleteSellerInput } = command;
    try {
      await this.sellerRepository.delete(deleteSellerInput);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
