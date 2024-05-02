// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BulkDeleteReportCommand } from '../command/bulk-delete-report/bulk-delete-report.command';
import {
  BulkDeleteReportInput,
  DeleteReportOutput,
} from '../dto/delete-report.dto';
import { ReportHelepr } from '../helper/report-helper';

@Injectable()
export class BulkDeleteReportUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly reportHelper: ReportHelepr,
  ) {}

  async bulkDeleteReport(
    input: BulkDeleteReportInput,
  ): Promise<DeleteReportOutput> {
    try {
      for (const reportId of input.ids) {
        await this.reportHelper.validateReportId(reportId);
      }
      await this.commandBus.execute(new BulkDeleteReportCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
