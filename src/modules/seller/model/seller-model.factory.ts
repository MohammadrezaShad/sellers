import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';
import { SellerModel } from './seller.model';
import { SellerRepository } from '../seller.repository';
import { CreateSellerInput } from '../dto/create-seller.dto';

@Injectable()
export class SellerModelFactory implements ModelFactory<SellerModel> {
  constructor(private readonly sellerRepository: SellerRepository) {}

  async create({
    name,
    marketerCode,
    nationalNumber,
    bankAccountNumber,
  }: CreateSellerInput): Promise<SellerModel> {
    const seller = new SellerModel(
      new ObjectId().toHexString(),
      name,
      marketerCode,
      nationalNumber,
      bankAccountNumber,
    );
    await this.sellerRepository.create(seller);
    return seller;
  }
}
