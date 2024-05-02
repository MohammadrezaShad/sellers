import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateSellerCommand } from '../command/create-seller/create-seller.command';
import {
  CreateSellerInput,
  CreateSellerOutput,
} from '../dto/create-seller.dto';
import { SellerHelepr } from '../helper/seller-helper';

@Injectable()
export class CreateSellerUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly sellerHelper: SellerHelepr,
  ) {}

  async createSeller(input: CreateSellerInput): Promise<CreateSellerOutput> {
    try {
      await this.commandBus.execute(new CreateSellerCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
