import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CreateUserInput } from '@/modules/user/dto/create-user.dto';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  @IsObjectId()
  userId: string;
}

@ObjectType()
export class UpdateUserOutput extends CoreOutput {}
