import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { RoleEntity } from '@/modules/auth/components/role/entity/role.entity';

@InputType()
export class FindRoleByIdInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class FindRoleByIdsInput {
  @Field(() => [String])
  ids: string[];
}

@InputType()
export class FindRoleByNameInput {
  @Field(() => String)
  name: string;
}

@ObjectType()
export class FindRoleOutput extends CoreOutput {
  @Field(() => RoleEntity, { nullable: true })
  result?: RoleEntity;
}

@ObjectType()
export class FindManyRolesOutput extends CoreOutput {
  @Field(() => [RoleEntity], { nullable: true })
  results?: RoleEntity[];
}
