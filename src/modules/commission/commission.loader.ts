import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { FindSellerByIdsUseCase } from '../seller/use-case/find-seller-by-ids.use-case';

@Injectable({ scope: Scope.REQUEST })
export default class CommissionDataLoader {
  constructor(
    private readonly findSellerByIdsUseCase: FindSellerByIdsUseCase,
  ) {}

  public readonly batchSeller = new DataLoader(
    async (sellerIds: readonly string[]) => {
      const seller = await this.findSellerByIdsUseCase.findSellerByids({
        ids: sellerIds as string[],
      });
      const sellerMap = new Map(seller.results.map(s => [s._id.toString(), s]));
      const finalSeller = sellerIds.map(sellerId => sellerMap.get(sellerId));

      return finalSeller;
    },
  );
}
