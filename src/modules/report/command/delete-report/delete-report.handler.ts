import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReportRepository } from '../../report.repository';
import { DeleteReportCommand } from './delete-report.command';

@CommandHandler(DeleteReportCommand)
export class DeleteReportHandler
  implements ICommandHandler<DeleteReportCommand>
{
  constructor(private readonly reportRepository: ReportRepository) {}

  async execute(command: DeleteReportCommand) {
    const { deleteReportInput } = command;
    try {
      await this.reportRepository.delete(deleteReportInput);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
