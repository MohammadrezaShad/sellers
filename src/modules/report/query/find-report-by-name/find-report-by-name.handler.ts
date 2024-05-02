import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ReportModel } from '../../model/report.model';
import { ReportRepository } from '../../report.repository';
import { FindReportByNameQuery } from './find-report-by-name.query';

@QueryHandler(FindReportByNameQuery)
export class FindReportByNameHanler
  implements IQueryHandler<FindReportByNameQuery>
{
  constructor(private readonly reportRepository: ReportRepository) {}
  async execute({ name }: FindReportByNameQuery): Promise<ReportModel | null> {
    const result = this.reportRepository.findByName(name);
    return result;
  }
}
