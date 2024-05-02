import { FindReportByIdInput } from '../../dto/find-report.dto';

export class FindReportByIdQuery {
  constructor(readonly findReportByIdInput: FindReportByIdInput) {}
}
