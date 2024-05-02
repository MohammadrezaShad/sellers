import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SellerModel } from '../../model/seller.model';
import { SellerRepository } from '../../seller.repository';
import { FindSellerByNameQuery } from './find-seller-by-name.query';

@QueryHandler(FindSellerByNameQuery)
export class FindSellerByNameHanler
  implements IQueryHandler<FindSellerByNameQuery>
{
  constructor(private readonly sellerRepository: SellerRepository) {}
  async execute({ name }: FindSellerByNameQuery): Promise<SellerModel | null> {
    const result = this.sellerRepository.findByName(name);
    return result;
  }
}
