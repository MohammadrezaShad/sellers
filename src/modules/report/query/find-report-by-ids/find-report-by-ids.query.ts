import { FindReportByIdsInput } from '../../dto/find-report.dto';

export class FindReportByIdsQuery {
  constructor(readonly findReportByIdsInput: FindReportByIdsInput) {}
}
