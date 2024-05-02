import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';
import { CommissionModel } from './Commission.model';
import { CommissionRepository } from '../commission.repository';
import { CreateCommissionInput } from '../dto/create-commission.dto';

@Injectable()
export class CommissionModelFactory implements ModelFactory<CommissionModel> {
  constructor(private readonly commissionRepository: CommissionRepository) {}

  async create({
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
  }: CreateCommissionInput): Promise<CommissionModel> {
    const commission = new CommissionModel(
      new ObjectId().toHexString(),
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
    await this.commissionRepository.create(commission);
    return commission;
  }
}
