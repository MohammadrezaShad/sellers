import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { ReportEntity } from '../entity/report.entity';

@InputType()
export class CreateReportInput extends PickType(ReportEntity, [
  'description',
  'commission',
  'netAmountAfterTaxDeduction',
] as const) {
  @Field(() => String, { nullable: true })
  seller?: string;
}

@ObjectType()
export class CreateReportOutput extends CoreOutput {}
