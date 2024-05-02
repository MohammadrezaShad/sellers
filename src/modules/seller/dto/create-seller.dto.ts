import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { SellerEntity } from '../entity/seller.entity';

@InputType()
export class CreateSellerInput extends PickType(SellerEntity, [
  'name',
  'marketerCode',
  'nationalNumber',
  'bankAccountNumber',
] as const) {}

@ObjectType()
export class CreateSellerOutput extends CoreOutput {}
