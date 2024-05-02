import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SellerModel } from '../../model/seller.model';
import { SellerRepository } from '../../seller.repository';
import { FindSellerByIdQuery } from './find-seller-by-id.query';

@QueryHandler(FindSellerByIdQuery)
export class FindSellerByIdHanler
  implements IQueryHandler<FindSellerByIdQuery>
{
  constructor(private readonly sellerRepository: SellerRepository) {}
  async execute({
    findSellerByIdInput,
  }: FindSellerByIdQuery): Promise<SellerModel | null> {
    const result = this.sellerRepository.findById(findSellerByIdInput);
    return result;
  }
}
