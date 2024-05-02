import { BulkDeleteReportHandler } from './bulk-delete-report/bulk-delete-report.handler';
import { CreateReportHandler } from './create-report/create-report.handler';
import { DeleteReportHandler } from './delete-report/delete-report.handler';
import { UpdateReportHandler } from './update-report/update-report.handler';

export const ReportCommandHandlers = [
  CreateReportHandler,
  UpdateReportHandler,
  DeleteReportHandler,
  BulkDeleteReportHandler,
];
