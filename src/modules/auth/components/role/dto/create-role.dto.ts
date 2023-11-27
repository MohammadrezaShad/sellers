import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { RoleEntity } from '@/modules/auth/components/role/entity/role.entity';

@InputType()
export class CreateRoleInput extends PickType(RoleEntity, [
  'name',
  'title',
] as const) {
  @Field(() => [String], { nullable: true })
  permissions?: string[];
}

@ObjectType()
export class CreateRoleOutput extends CoreOutput {}
