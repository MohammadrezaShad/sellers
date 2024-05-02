// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BulkDeleteSellerCommand } from '../command/bulk-delete-seller/bulk-delete-seller.command';
import {
  BulkDeleteSellerInput,
  DeleteSellerOutput,
} from '../dto/delete-seller.dto';
import { SellerHelepr } from '../helper/seller-helper';

@Injectable()
export class BulkDeleteSellerUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly sellerHelper: SellerHelepr,
  ) {}

  async bulkDeleteSeller(
    input: BulkDeleteSellerInput,
  ): Promise<DeleteSellerOutput> {
    try {
      for (const sellerId of input.ids) {
        await this.sellerHelper.validateSellerId(sellerId);
      }
      await this.commandBus.execute(new BulkDeleteSellerCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
