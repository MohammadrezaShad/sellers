import { FindCommissionByIdsInput } from '../../dto/find-commission.dto';

export class FindCommissionByIdsQuery {
  constructor(readonly findCommissionByIdsInput: FindCommissionByIdsInput) {}
}
