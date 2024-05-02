// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteReportCommand } from '../command/delete-report/delete-report.command';
import {
  DeleteReportInput,
  DeleteReportOutput,
} from '../dto/delete-report.dto';
import { ReportHelepr } from '../helper/report-helper';

@Injectable()
export class DeleteReportUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly reportHelper: ReportHelepr,
  ) {}

  async deleteReport(input: DeleteReportInput): Promise<DeleteReportOutput> {
    try {
      await this.reportHelper.validateReportId(input.reportId);
      await this.commandBus.execute(new DeleteReportCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
