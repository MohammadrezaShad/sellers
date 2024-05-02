import { Field, InputType, ObjectType } from '@nestjs/graphql';

import {
  PaginationInput,
  PaginationOutput,
} from '@/common/dtos/pagination.dto';
import { CommissionEntity } from '../entity/commission.entity';

@InputType('SearchCommissionInput')
export class SearchCommissionInput extends PaginationInput {}

@ObjectType('SearchCommissionOutput')
export class SearchCommissionOutput extends PaginationOutput {
  @Field(() => [CommissionEntity], { nullable: true })
  results?: CommissionEntity[];
}
