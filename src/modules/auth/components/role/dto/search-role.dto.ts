import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

import {
  PaginationInput,
  PaginationOutput,
} from '@/common/dtos/pagination.dto';
import { RoleEntity } from '@/modules/auth/components/role/entity/role.entity';
import { RoleModel } from '@/modules/auth/components/role/model/role.model';

@InputType('SearchRoleInput')
export class SearchRoleInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  text?: string;
}

@ObjectType('SearchRoleOutput')
export class SearchRoleOutput extends PaginationOutput {
  @Field(() => [RoleEntity], { nullable: true })
  results?: RoleEntity[];
}

@ObjectType('SearchRoleResults')
export class SearchRoleResults extends PaginationOutput {
  @Field(() => [RoleModel], { nullable: true })
  results?: RoleModel[];
}
