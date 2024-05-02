import { DeleteCommissionInput } from '../../dto/delete-commission.dto';

export class DeleteCommissionCommand {
  constructor(public readonly deleteCommissionInput: DeleteCommissionInput) {}
}
