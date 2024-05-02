import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  SearchReportInput,
  SearchReportOutput,
} from '../dto/search-report.dto';
import { SearchReportQuery } from '../query/search-report/search-report.query';

@Injectable()
export class SearchReportUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(input: SearchReportInput): Promise<SearchReportOutput> {
    try {
      const { results, success, totalCount, totalPages }: SearchReportOutput =
        await this.queryBus.execute(new SearchReportQuery(input));

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
