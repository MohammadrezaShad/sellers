import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

import {
  PaginationInput,
  PaginationOutput,
} from '@/common/dtos/pagination.dto';
import { ReportEntity } from '../entity/report.entity';

@InputType('SearchReportInput')
export class SearchReportInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  text?: string;
}

@ObjectType('SearchReportOutput')
export class SearchReportOutput extends PaginationOutput {
  @Field(() => [ReportEntity], { nullable: true })
  results?: ReportEntity[];
}
