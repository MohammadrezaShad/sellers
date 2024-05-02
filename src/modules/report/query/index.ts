import { FindReportByIdHanler } from './find-report-by-id/find-report-by-id.handler';
import { FindReportByIdsHanler } from './find-report-by-ids/find-report-by-ids.handler';
import { FindReportByNameHanler } from './find-report-by-name/find-report-by-name.handler';
import { SearchReportHanler } from './search-report/search-report.handler';

export const ReportQueryHandlers = [
  SearchReportHanler,
  FindReportByIdHanler,
  FindReportByIdsHanler,
  FindReportByNameHanler,
];
