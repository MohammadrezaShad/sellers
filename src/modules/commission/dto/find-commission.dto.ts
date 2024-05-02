import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { CoreOutput } from '@/common/dtos/output.dto';
import { CommissionEntity } from '../entity/commission.entity';

@InputType()
export class FindCommissionByIdInput {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@InputType()
export class FindCommissionByIdsInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@ObjectType()
export class FindCommissionOutput extends CoreOutput {
  @Field(() => CommissionEntity, { nullable: true })
  result?: CommissionEntity;
}

@ObjectType()
export class FindManyCommissionsOutput extends CoreOutput {
  @Field(() => [CommissionEntity], { nullable: true })
  results?: CommissionEntity[];
}
