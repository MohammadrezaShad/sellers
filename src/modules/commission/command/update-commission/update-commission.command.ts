import { UpdateCommissionInput } from '../../dto/update-commission.dto';

export class UpdateCommissionCommand {
  constructor(public readonly updateCommissionInput: UpdateCommissionInput) {}
}
