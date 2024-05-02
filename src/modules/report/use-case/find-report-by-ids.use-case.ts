// Permission-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindManyReportsOutput,
  FindReportByIdsInput,
} from '../dto/find-report.dto';
import { ReportEntityFactory } from '../entity/report.factory';
import { ReportModel } from '../model/report.model';
import { FindReportByIdsQuery } from '../query/find-report-by-ids/find-report-by-ids.query';

@Injectable()
export class FindReportByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly reportFactory: ReportEntityFactory,
  ) {}

  async findReportByids({
    ids,
  }: FindReportByIdsInput): Promise<FindManyReportsOutput> {
    try {
      const reports: ReportModel[] = await this.queryBus.execute(
        new FindReportByIdsQuery({ ids: ids }),
      );

      const resultList = reports.map(model => this.reportFactory.create(model));
      return {
        success: true,
        results: resultList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
