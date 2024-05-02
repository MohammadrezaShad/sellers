import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ReportModel } from '../../model/report.model';
import { ReportRepository } from '../../report.repository';
import { FindReportByIdQuery } from './find-report-by-id.query';

@QueryHandler(FindReportByIdQuery)
export class FindReportByIdHanler
  implements IQueryHandler<FindReportByIdQuery>
{
  constructor(private readonly reportRepository: ReportRepository) {}
  async execute({
    findReportByIdInput,
  }: FindReportByIdQuery): Promise<ReportModel | null> {
    const result = this.reportRepository.findById(findReportByIdInput);
    return result;
  }
}
