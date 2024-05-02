import { DeleteReportInput } from '../../dto/delete-report.dto';

export class DeleteReportCommand {
  constructor(public readonly deleteReportInput: DeleteReportInput) {}
}
