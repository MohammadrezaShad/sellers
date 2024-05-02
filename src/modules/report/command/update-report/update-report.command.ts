import { UpdateReportInput } from '../../dto/update-report.dto';

export class UpdateReportCommand {
  constructor(public readonly updateReportInput: UpdateReportInput) {}
}
