import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchReportOutput } from '../../dto/search-report.dto';
import { ReportRepository } from '../../report.repository';
import { SearchReportQuery } from './search-report.query';

@QueryHandler(SearchReportQuery)
export class SearchReportHanler implements IQueryHandler<SearchReportQuery> {
  constructor(private readonly reportRepository: ReportRepository) {}
  async execute({
    searchReportInput,
  }: SearchReportQuery): Promise<SearchReportOutput> {
    const result = await this.reportRepository.search(searchReportInput);
    return result;
  }
}
