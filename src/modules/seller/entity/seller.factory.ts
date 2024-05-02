import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';
import { SellerModel } from '../model/seller.model';
import { SellerEntity } from './seller.entity';

@Injectable()
export class SellerEntityFactory
  implements ModelEntityFactory<SellerEntity, SellerModel>
{
  create(model: SellerModel): SellerEntity | null {
    if (!model) return null;
    return {
      _id: new ObjectId(model.getId()),
      name: model.getName(),
      marketerCode: model.getMarketerCode(),
      nationalNumber: model.getNationalNumber(),
      bankAccountNumber: model.getBankAccountNumber(),
    };
  }
  createFromEntity(entity: SellerEntity): SellerModel | null {
    if (!entity) return null;
    const { _id, name, marketerCode, nationalNumber, bankAccountNumber } =
      entity;
    return new SellerModel(
      _id.toHexString(),
      name,
      marketerCode,
      nationalNumber,
      bankAccountNumber,
    );
  }
}
