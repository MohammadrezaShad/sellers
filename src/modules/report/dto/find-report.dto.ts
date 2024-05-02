import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { CoreOutput } from '@/common/dtos/output.dto';
import { ReportEntity } from '../entity/report.entity';

@InputType()
export class FindReportByIdInput {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@InputType()
export class FindReportByIdsInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@InputType()
export class FindReportByNameInput {
  @Field(() => String)
  name: string;
}

@ObjectType()
export class FindReportOutput extends CoreOutput {
  @Field(() => ReportEntity, { nullable: true })
  result?: ReportEntity;
}

@ObjectType()
export class FindManyReportsOutput extends CoreOutput {
  @Field(() => [ReportEntity], { nullable: true })
  results?: ReportEntity[];
}
