import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CreateUserInput } from '@/modules/user/dto/create-user.dto';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  userId: string;
}

@ObjectType()
export class UpdateUserOutput extends CoreOutput {}
