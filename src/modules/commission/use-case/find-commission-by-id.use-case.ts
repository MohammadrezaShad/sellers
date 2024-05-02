// Permission-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindCommissionByIdInput,
  FindCommissionOutput,
} from '../dto/find-commission.dto';
import { CommissionEntityFactory } from '../entity/commission.factory';
import { CommissionModel } from '../model/Commission.model';
import { FindCommissionByIdQuery } from '../query/find-commission-by-id/find-commission-by-id.query';
import { COMMISSION_NOT_FOUND } from '../constant/error-message.constant';

@Injectable()
export class FindCommissionByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commissionFactory: CommissionEntityFactory,
  ) {}

  async findCommissionByid({
    id,
  }: FindCommissionByIdInput): Promise<FindCommissionOutput> {
    try {
      const commission: CommissionModel = await this.queryBus.execute(
        new FindCommissionByIdQuery({ id: id }),
      );
      if (!commission) {
        throw new NotFoundException(COMMISSION_NOT_FOUND);
      }
      return {
        success: true,
        result: this.commissionFactory.create(commission),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
