import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateReportCommand } from './update-report.command';
import { ReportRepository } from '../../report.repository';

@CommandHandler(UpdateReportCommand)
export class UpdateReportHandler
  implements ICommandHandler<UpdateReportCommand>
{
  constructor(private readonly reportRepository: ReportRepository) {}

  async execute(command: UpdateReportCommand) {
    const { updateReportInput } = command;
    await this.reportRepository.update(updateReportInput);
  }
}
