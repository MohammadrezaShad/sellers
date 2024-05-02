import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CommissionModel } from '../../model/Commission.model';
import { CommissionRepository } from '../../commission.repository';
import { FindCommissionByIdQuery } from './find-commission-by-id.query';

@QueryHandler(FindCommissionByIdQuery)
export class FindCommissionByIdHanler
  implements IQueryHandler<FindCommissionByIdQuery>
{
  constructor(private readonly commissionRepository: CommissionRepository) {}
  async execute({
    findCommissionByIdInput,
  }: FindCommissionByIdQuery): Promise<CommissionModel | null> {
    const result = this.commissionRepository.findById(findCommissionByIdInput);
    return result;
  }
}
