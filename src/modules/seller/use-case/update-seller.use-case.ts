// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateSellerCommand } from '../command/update-seller/update-seller.command';
import {
  UpdateSellerInput,
  UpdateSellerOutput,
} from '../dto/update-seller.dto';
import { SellerHelepr } from '../helper/seller-helper';

@Injectable()
export class UpdateSellerUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly sellerHelper: SellerHelepr,
  ) {}

  async updateSeller(input: UpdateSellerInput): Promise<UpdateSellerOutput> {
    try {
      await this.sellerHelper.validateSellerId(input.sellerId);

      await this.commandBus.execute(new UpdateSellerCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
