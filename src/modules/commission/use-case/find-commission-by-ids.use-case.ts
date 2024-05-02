// Permission-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindManyCommissionsOutput,
  FindCommissionByIdsInput,
} from '../dto/find-commission.dto';
import { CommissionEntityFactory } from '../entity/commission.factory';
import { CommissionModel } from '../model/Commission.model';
import { FindCommissionByIdsQuery } from '../query/find-commission-by-ids/find-commission-by-ids.query';

@Injectable()
export class FindCommissionByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commissionFactory: CommissionEntityFactory,
  ) {}

  async findCommissionByids({
    ids,
  }: FindCommissionByIdsInput): Promise<FindManyCommissionsOutput> {
    try {
      const commissions: CommissionModel[] = await this.queryBus.execute(
        new FindCommissionByIdsQuery({ ids: ids }),
      );

      const resultList = commissions.map(model =>
        this.commissionFactory.create(model),
      );
      return {
        success: true,
        results: resultList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
