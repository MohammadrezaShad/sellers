// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateReportCommand } from '../command/update-report/update-report.command';
import {
  UpdateReportInput,
  UpdateReportOutput,
} from '../dto/update-report.dto';
import { ReportHelepr } from '../helper/report-helper';

@Injectable()
export class UpdateReportUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly reportHelper: ReportHelepr,
  ) {}

  async updateReport(input: UpdateReportInput): Promise<UpdateReportOutput> {
    try {
      await this.reportHelper.validateReportId(input.reportId);

      await this.commandBus.execute(new UpdateReportCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
