// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteSellerCommand } from '../command/delete-seller/delete-seller.command';
import {
  DeleteSellerInput,
  DeleteSellerOutput,
} from '../dto/delete-seller.dto';
import { SellerHelepr } from '../helper/seller-helper';

@Injectable()
export class DeleteSellerUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly sellerHelper: SellerHelepr,
  ) {}

  async deleteSeller(input: DeleteSellerInput): Promise<DeleteSellerOutput> {
    try {
      await this.sellerHelper.validateSellerId(input.sellerId);
      await this.commandBus.execute(new DeleteSellerCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
