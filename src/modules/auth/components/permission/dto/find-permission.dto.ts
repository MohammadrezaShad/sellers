import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { PermissionEntity } from '@/modules/auth/components/permission/entity/permission.entity';

@InputType()
export class FindPermissionByIdInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class FindPermissionByIdsInput {
  @Field(() => [String])
  ids: string[];
}

@InputType()
export class FindPermissionByNameInput {
  @Field(() => String)
  name: string;
}
@ObjectType()
export class FindPermissionOutput extends CoreOutput {
  @Field(() => PermissionEntity, { nullable: true })
  result?: PermissionEntity;
}

@ObjectType()
export class FindManyPermissionsOutput extends CoreOutput {
  @Field(() => [PermissionEntity], { nullable: true })
  results?: PermissionEntity[];
}
