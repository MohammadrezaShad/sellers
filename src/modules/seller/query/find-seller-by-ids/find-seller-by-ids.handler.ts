import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SellerModel } from '../../model/seller.model';
import { SellerRepository } from '../../seller.repository';
import { FindSellerByIdsQuery } from './find-seller-by-ids.query';

@QueryHandler(FindSellerByIdsQuery)
export class FindSellerByIdsHanler
  implements IQueryHandler<FindSellerByIdsQuery>
{
  constructor(private readonly sellerRepository: SellerRepository) {}
  async execute({
    findSellerByIdsInput,
  }: FindSellerByIdsQuery): Promise<SellerModel[] | null> {
    const result = this.sellerRepository.findManyById(findSellerByIdsInput);
    return result;
  }
}
