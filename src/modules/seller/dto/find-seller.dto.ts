import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { CoreOutput } from '@/common/dtos/output.dto';
import { SellerEntity } from '../entity/seller.entity';

@InputType()
export class FindSellerByIdInput {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@InputType()
export class FindSellerByIdsInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@InputType()
export class FindSellerByNameInput {
  @Field(() => String)
  name: string;
}

@ObjectType()
export class FindSellerOutput extends CoreOutput {
  @Field(() => SellerEntity, { nullable: true })
  result?: SellerEntity;
}

@ObjectType()
export class FindManySellersOutput extends CoreOutput {
  @Field(() => [SellerEntity], { nullable: true })
  results?: SellerEntity[];
}
