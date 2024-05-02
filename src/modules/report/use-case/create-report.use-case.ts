import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateReportCommand } from '../command/create-report/create-report.command';
import {
  CreateReportInput,
  CreateReportOutput,
} from '../dto/create-report.dto';
import { ReportHelepr } from '../helper/report-helper';

@Injectable()
export class CreateReportUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly reportHelper: ReportHelepr,
  ) {}

  async createReport(input: CreateReportInput): Promise<CreateReportOutput> {
    try {
      await this.commandBus.execute(new CreateReportCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
