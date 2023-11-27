import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';

@InputType()
export class DeleteRoleInput {
  @Field(() => String)
  roleId: string;
}

@InputType()
export class BulkDeleteRoleInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class DeleteRoleOutput extends CoreOutput {}
