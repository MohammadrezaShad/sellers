// Permission-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindManySellersOutput,
  FindSellerByIdsInput,
} from '../dto/find-seller.dto';
import { SellerEntityFactory } from '../entity/seller.factory';
import { SellerModel } from '../model/seller.model';
import { FindSellerByIdsQuery } from '../query/find-seller-by-ids/find-seller-by-ids.query';

@Injectable()
export class FindSellerByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly sellerFactory: SellerEntityFactory,
  ) {}

  async findSellerByids({
    ids,
  }: FindSellerByIdsInput): Promise<FindManySellersOutput> {
    try {
      const sellers: SellerModel[] = await this.queryBus.execute(
        new FindSellerByIdsQuery({ ids: ids }),
      );

      const resultList = sellers.map(model => this.sellerFactory.create(model));
      return {
        success: true,
        results: resultList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
