import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  SearchCommissionInput,
  SearchCommissionOutput,
} from '../dto/search-commission.dto';
import { SearchCommissionQuery } from '../query/search-commission/search-commission.query';

@Injectable()
export class SearchCommissionUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(
    searchCommissionInput: SearchCommissionInput,
  ): Promise<SearchCommissionOutput> {
    try {
      const {
        results,
        success,
        totalCount,
        totalPages,
      }: SearchCommissionOutput = await this.queryBus.execute(
        new SearchCommissionQuery(searchCommissionInput),
      );

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
