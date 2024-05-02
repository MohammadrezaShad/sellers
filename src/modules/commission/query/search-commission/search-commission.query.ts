import { SearchCommissionInput } from '../../dto/search-commission.dto';

export class SearchCommissionQuery {
  constructor(readonly searchCommissionInput: SearchCommissionInput) {}
}
