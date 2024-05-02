import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class DeleteSellerInput {
  @Field(() => String)
  @IsObjectId()
  sellerId: string;
}

@InputType()
export class BulkDeleteSellerInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@ObjectType()
export class DeleteSellerOutput extends CoreOutput {}
