import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CreateRoleInput } from '@/modules/auth/components/role/dto/create-role.dto';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => String)
  roleId: string;
}

@ObjectType()
export class UpdateRoleOutput extends CoreOutput {}
