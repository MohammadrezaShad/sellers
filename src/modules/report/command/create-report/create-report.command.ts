import { CreateReportInput } from '../../dto/create-report.dto';

export class CreateReportCommand {
  constructor(public readonly createReportInput: CreateReportInput) {}
}
