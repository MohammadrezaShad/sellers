import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';
import { CommissionModel } from '../model/Commission.model';
import { CommissionEntity } from './commission.entity';

@Injectable()
export class CommissionEntityFactory
  implements ModelEntityFactory<CommissionEntity, CommissionModel>
{
  create(model: CommissionModel): CommissionEntity | null {
    if (!model) return null;
    return {
      _id: new ObjectId(model.getId()),
      seller: model.getSeller(),
      percent: model.getPercent(),
      lifeInsurancePremium: model.getLifeInsurancePremium(),
      additionalInsurancePremium: model.getAdditionalInsurancePremium(),
      insurancePremium: model.getInsurancePremium(),
      lifeInsuranceCommission: model.getLifeInsuranceCommission(),
      additionalInsuranceCommission: model.getAdditionalInsuranceCommission(),
      totalCommission: model.getTotalCommission(),
      debt: model.getDebt(),
      totalCommssionAfterDeductingDebt:
        model.getTotalCommssionAfterDeductingDebt(),
      depositTaminEjtemaei: model.getDepositTaminEjtemaei(),
      totalCommssionAfterDeductingDebtAndDepositTaminEjtemaei:
        model.getTotalCommssionAfterDeductingDebtAndDepositTaminEjtemaei(),
      date: model.getDate(),
    };
  }
  createFromEntity(entity: CommissionEntity): CommissionModel | null {
    if (!entity) return null;
    const {
      _id,
      seller,
      percent,
      lifeInsurancePremium,
      additionalInsurancePremium,
      insurancePremium,
      lifeInsuranceCommission,
      additionalInsuranceCommission,
      totalCommission,
      debt,
      totalCommssionAfterDeductingDebt,
      depositTaminEjtemaei,
      totalCommssionAfterDeductingDebtAndDepositTaminEjtemaei,
      date,
    } = entity;
    return new CommissionModel(
      _id.toHexString(),
      seller,
      percent,
      lifeInsurancePremium,
      additionalInsurancePremium,
      insurancePremium,
      lifeInsuranceCommission,
      additionalInsuranceCommission,
      totalCommission,
      debt,
      totalCommssionAfterDeductingDebt,
      depositTaminEjtemaei,
      totalCommssionAfterDeductingDebtAndDepositTaminEjtemaei,
      date,
    );
  }
}
