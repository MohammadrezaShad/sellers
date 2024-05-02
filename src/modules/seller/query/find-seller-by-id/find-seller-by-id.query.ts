import { FindSellerByIdInput } from '../../dto/find-seller.dto';

export class FindSellerByIdQuery {
  constructor(readonly findSellerByIdInput: FindSellerByIdInput) {}
}
