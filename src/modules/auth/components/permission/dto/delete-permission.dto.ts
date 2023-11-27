import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';

@InputType()
export class DeletePermissionInput {
  @Field(() => String)
  permissionId: string;
}

@InputType()
export class BulkDeletePermissionInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class DeletePermissionOutput extends CoreOutput {}
