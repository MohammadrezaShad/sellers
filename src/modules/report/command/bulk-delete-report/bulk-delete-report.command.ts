import { BulkDeleteReportInput } from '../../dto/delete-report.dto';

export class BulkDeleteReportCommand {
  constructor(public readonly bulkDeleteReportInput: BulkDeleteReportInput) {}
}
