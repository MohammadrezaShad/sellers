import { SearchSellerInput } from '../../dto/search-seller.dto';

export class SearchSellerQuery {
  constructor(readonly searchSellerInput: SearchSellerInput) {}
}
