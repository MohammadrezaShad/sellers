import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class DeleteReportInput {
  @Field(() => String)
  @IsObjectId()
  reportId: string;
}

@InputType()
export class BulkDeleteReportInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@ObjectType()
export class DeleteReportOutput extends CoreOutput {}
