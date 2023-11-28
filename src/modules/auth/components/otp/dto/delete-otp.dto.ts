import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';

@InputType()
export class DeleteOtpInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class BulkDeleteOtpInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class DeleteOtpOutput extends CoreOutput {}
