import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CommissionModel } from '../../model/Commission.model';
import { CommissionRepository } from '../../commission.repository';
import { FindCommissionByIdsQuery } from './find-commission-by-ids.query';

@QueryHandler(FindCommissionByIdsQuery)
export class FindCommissionByIdsHanler
  implements IQueryHandler<FindCommissionByIdsQuery>
{
  constructor(private readonly commissionRepository: CommissionRepository) {}
  async execute({
    findCommissionByIdsInput,
  }: FindCommissionByIdsQuery): Promise<CommissionModel[] | null> {
    const result = this.commissionRepository.findManyById(
      findCommissionByIdsInput,
    );
    return result;
  }
}
