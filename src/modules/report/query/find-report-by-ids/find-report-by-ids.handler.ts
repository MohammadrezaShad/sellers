import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ReportModel } from '../../model/report.model';
import { ReportRepository } from '../../report.repository';
import { FindReportByIdsQuery } from './find-report-by-ids.query';

@QueryHandler(FindReportByIdsQuery)
export class FindReportByIdsHanler
  implements IQueryHandler<FindReportByIdsQuery>
{
  constructor(private readonly reportRepository: ReportRepository) {}
  async execute({
    findReportByIdsInput,
  }: FindReportByIdsQuery): Promise<ReportModel[] | null> {
    const result = this.reportRepository.findManyById(findReportByIdsInput);
    return result;
  }
}
