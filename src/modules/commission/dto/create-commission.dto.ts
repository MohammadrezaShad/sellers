import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CommissionEntity } from '../entity/commission.entity';

@InputType()
export class CreateCommissionInput extends PickType(CommissionEntity, [
  'seller',
  'percent',
  'lifeInsurancePremium',
  'additionalInsurancePremium',
  'insurancePremium',
  'lifeInsuranceCommission',
  'additionalInsuranceCommission',
  'totalCommission',
  'debt',
  'totalCommssionAfterDeductingDebt',
  'depositTaminEjtemaei',
  'totalCommssionAfterDeductingDebtAndDepositTaminEjtemaei',
  'date',
] as const) {}

@ObjectType()
export class CreateCommissionOutput extends CoreOutput {}
