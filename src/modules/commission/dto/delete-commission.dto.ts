import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class DeleteCommissionInput {
  @Field(() => String)
  @IsObjectId()
  commissionId: string;
}

@InputType()
export class BulkDeleteCommissionInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@ObjectType()
export class DeleteCommissionOutput extends CoreOutput {}
