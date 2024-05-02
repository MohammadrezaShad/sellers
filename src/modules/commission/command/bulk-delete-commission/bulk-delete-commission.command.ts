import { BulkDeleteCommissionInput } from '../../dto/delete-commission.dto';

export class BulkDeleteCommissionCommand {
  constructor(
    public readonly bulkDeleteCommissionInput: BulkDeleteCommissionInput,
  ) {}
}
