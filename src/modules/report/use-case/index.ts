import { BulkDeleteReportUseCase } from './bulk-delete-report.use-case';
import { CreateReportFromStaticExcelUseCase } from './create-report-from-static-excel.use-case';
import { CreateReportUseCase } from './create-report.use-case';
import { DeleteReportUseCase } from './delete-report.use-case';
import { FindReportByIdUseCase } from './find-report-by-id.use-case';
import { FindReportByIdsUseCase } from './find-report-by-ids.use-case';
import { FindReportByNameUseCase } from './find-report-by-name.use-case';
import { SearchReportUseCase } from './search-report.use-case';
import { UpdateReportUseCase } from './update-report.use-case';
import { UploadFileUseCase } from './upload-file.use-case';

export const ReportUseCases = [
  CreateReportUseCase,
  UpdateReportUseCase,
  DeleteReportUseCase,
  SearchReportUseCase,
  FindReportByIdUseCase,
  FindReportByIdsUseCase,
  FindReportByNameUseCase,
  BulkDeleteReportUseCase,
  UploadFileUseCase,
  CreateReportFromStaticExcelUseCase,
];
