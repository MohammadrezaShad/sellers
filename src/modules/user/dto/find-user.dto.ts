import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType()
export class FindUserByIdInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class FindUserByEmailInput {
  @Field(() => String)
  email: string;
}

@InputType()
export class FindUserByPhoneInput {
  @Field(() => String)
  phone: string;
}

@InputType()
export class FindUsersByRoleInput {
  @Field(() => String)
  roleId: string;
}

@ObjectType()
export class FindUserOutput extends CoreOutput {
  @Field(() => UserEntity, { nullable: true })
  result?: UserEntity;
}

@ObjectType()
export class FindManyUserOutput extends CoreOutput {
  @Field(() => [UserEntity], { nullable: true })
  results?: UserEntity[];
}
