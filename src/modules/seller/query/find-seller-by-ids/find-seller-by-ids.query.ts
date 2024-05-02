import { FindSellerByIdsInput } from '../../dto/find-seller.dto';

export class FindSellerByIdsQuery {
  constructor(readonly findSellerByIdsInput: FindSellerByIdsInput) {}
}
