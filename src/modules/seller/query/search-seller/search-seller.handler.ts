import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchSellerOutput } from '../../dto/search-seller.dto';
import { SellerRepository } from '../../seller.repository';
import { SearchSellerQuery } from './search-seller.query';

@QueryHandler(SearchSellerQuery)
export class SearchSellerHanler implements IQueryHandler<SearchSellerQuery> {
  constructor(private readonly sellerRepository: SellerRepository) {}
  async execute({
    searchSellerInput,
  }: SearchSellerQuery): Promise<SearchSellerOutput> {
    const result = await this.sellerRepository.search(searchSellerInput);
    return result;
  }
}
