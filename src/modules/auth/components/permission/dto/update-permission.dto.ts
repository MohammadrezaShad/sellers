import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CreatePermissionInput } from '@/modules/auth/components/permission/dto/create-permission.dto';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
  @Field(() => String)
  permissionId: string;
}

@ObjectType()
export class UpdatePermissionOutput extends CoreOutput {}
