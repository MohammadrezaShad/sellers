// Permission-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindReportByNameInput,
  FindReportOutput,
} from '../dto/find-report.dto';
import { ReportEntityFactory } from '../entity/report.factory';
import { ReportModel } from '../model/report.model';
import { FindReportByNameQuery } from '../query/find-report-by-name/find-report-by-name.query';
import { REPORT_NOT_FOUND } from '../constant/error-message.constant';

@Injectable()
export class FindReportByNameUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly reportFactory: ReportEntityFactory,
  ) {}

  async findReportByName({
    name,
  }: FindReportByNameInput): Promise<FindReportOutput> {
    try {
      const report: ReportModel = await this.queryBus.execute(
        new FindReportByNameQuery(name),
      );
      if (!report) {
        throw new NotFoundException(REPORT_NOT_FOUND);
      }
      return {
        success: true,
        result: this.reportFactory.create(report),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
