import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { CreateReportInput } from './create-report.dto';

@InputType()
export class UpdateReportInput extends PartialType(CreateReportInput) {
  @Field(() => String)
  @IsObjectId()
  reportId: string;
}

@ObjectType()
export class UpdateReportOutput extends CoreOutput {}
