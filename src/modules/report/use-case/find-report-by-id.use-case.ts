// Permission-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindReportByIdInput, FindReportOutput } from '../dto/find-report.dto';
import { ReportEntityFactory } from '../entity/report.factory';
import { ReportModel } from '../model/report.model';
import { FindReportByIdQuery } from '../query/find-report-by-id/find-report-by-id.query';
import { REPORT_NOT_FOUND } from '../constant/error-message.constant';

@Injectable()
export class FindReportByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly reportFactory: ReportEntityFactory,
  ) {}

  async findReportByid({ id }: FindReportByIdInput): Promise<FindReportOutput> {
    try {
      const report: ReportModel = await this.queryBus.execute(
        new FindReportByIdQuery({ id: id }),
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
