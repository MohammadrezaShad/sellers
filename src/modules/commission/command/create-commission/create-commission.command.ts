import { CreateCommissionInput } from '../../dto/create-commission.dto';

export class CreateCommissionCommand {
  constructor(public readonly createCommissionInput: CreateCommissionInput) {}
}
