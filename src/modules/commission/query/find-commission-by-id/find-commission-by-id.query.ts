import { FindCommissionByIdInput } from '../../dto/find-commission.dto';

export class FindCommissionByIdQuery {
  constructor(readonly findCommissionByIdInput: FindCommissionByIdInput) {}
}
