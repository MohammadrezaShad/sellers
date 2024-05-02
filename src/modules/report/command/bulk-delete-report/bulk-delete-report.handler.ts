import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReportRepository } from '../../report.repository';
import { BulkDeleteReportCommand } from './bulk-delete-report.command';

@CommandHandler(BulkDeleteReportCommand)
export class BulkDeleteReportHandler
  implements ICommandHandler<BulkDeleteReportCommand>
{
  constructor(private readonly reportRepository: ReportRepository) {}
  async execute(command: BulkDeleteReportCommand) {
    const { bulkDeleteReportInput } = command;
    try {
      await this.reportRepository.bulkDelete(bulkDeleteReportInput.ids);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
