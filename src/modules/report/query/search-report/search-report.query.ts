import { SearchReportInput } from '../../dto/search-report.dto';

export class SearchReportQuery {
  constructor(readonly searchReportInput: SearchReportInput) {}
}
