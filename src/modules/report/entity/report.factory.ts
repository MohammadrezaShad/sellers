import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';
import { ReportModel } from '../model/report.model';
import { ReportEntity } from './report.entity';

@Injectable()
export class ReportEntityFactory
  implements ModelEntityFactory<ReportEntity, ReportModel>
{
  create(model: ReportModel): ReportEntity | null {
    if (!model) return null;
    return {
      _id: new ObjectId(model.getId()),
      seller: model.getSeller(),
      description: model.getDescription(),
      commission: model.getCommission(),
      netAmountAfterTaxDeduction: model.getNetAmountAfterTaxDeduction(),
    };
  }
  createFromEntity(entity: ReportEntity): ReportModel | null {
    if (!entity) return null;
    const { _id, seller, description, commission, netAmountAfterTaxDeduction } =
      entity;
    return new ReportModel(
      _id.toHexString(),
      seller,
      description,
      commission,
      netAmountAfterTaxDeduction,
    );
  }
}
