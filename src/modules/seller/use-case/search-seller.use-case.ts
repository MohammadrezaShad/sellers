import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  SearchSellerInput,
  SearchSellerOutput,
} from '../dto/search-seller.dto';
import { SearchSellerQuery } from '../query/search-seller/search-seller.query';

@Injectable()
export class SearchSellerUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(
    searchSellerInput: SearchSellerInput,
  ): Promise<SearchSellerOutput> {
    try {
      const { results, success, totalCount, totalPages }: SearchSellerOutput =
        await this.queryBus.execute(new SearchSellerQuery(searchSellerInput));

      return {
        success,
        results: results,
        totalCount,
        totalPages,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
