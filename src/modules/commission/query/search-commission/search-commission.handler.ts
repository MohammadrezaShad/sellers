import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchCommissionOutput } from '../../dto/search-commission.dto';
import { CommissionRepository } from '../../commission.repository';
import { SearchCommissionQuery } from './search-commission.query';

@QueryHandler(SearchCommissionQuery)
export class SearchCommissionHanler
  implements IQueryHandler<SearchCommissionQuery>
{
  constructor(private readonly commissionRepository: CommissionRepository) {}
  async execute({
    searchCommissionInput,
  }: SearchCommissionQuery): Promise<SearchCommissionOutput> {
    const result = await this.commissionRepository.search(
      searchCommissionInput,
    );
    return result;
  }
}
