import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SellerModel } from '../../model/seller.model';
import { SellerRepository } from '../../seller.repository';
import { FindSellerByNameAndNationalNumberQuery } from './find-seller-by-name-and-national-number.query';

@QueryHandler(FindSellerByNameAndNationalNumberQuery)
export class FindSellerByNameAndNationalNumberHanler
  implements IQueryHandler<FindSellerByNameAndNationalNumberQuery>
{
  constructor(private readonly sellerRepository: SellerRepository) {}
  async execute({
    name,
    nationalNumber,
  }: FindSellerByNameAndNationalNumberQuery): Promise<SellerModel | null> {
    const result = this.sellerRepository.findByNameAndNationalNumber(
      name,
      nationalNumber,
    );
    return result;
  }
}
