import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReportModelFactory } from '../../model/report-model.factory';
import { CreateReportCommand } from './create-report.command';

@CommandHandler(CreateReportCommand)
export class CreateReportHandler
  implements ICommandHandler<CreateReportCommand>
{
  constructor(private readonly reportModelFactory: ReportModelFactory) {}

  async execute(command: CreateReportCommand) {
    const { createReportInput } = command;
    await this.reportModelFactory.create(createReportInput);
  }
}
