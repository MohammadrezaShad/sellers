import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SellerModel } from '../../model/seller.model';
import { SellerRepository } from '../../seller.repository';
import { FindSellerByNameAndBankAccountNumberQuery } from './find-seller-by-name-and-bank-account-number.query';

@QueryHandler(FindSellerByNameAndBankAccountNumberQuery)
export class FindSellerByNameAndBankAccountNumberHanler
  implements IQueryHandler<FindSellerByNameAndBankAccountNumberQuery>
{
  constructor(private readonly sellerRepository: SellerRepository) {}
  async execute({
    name,
    bankAccountNumber,
  }: FindSellerByNameAndBankAccountNumberQuery): Promise<SellerModel | null> {
    const result = this.sellerRepository.findByNameAndBankAccountNumber(
      name,
      bankAccountNumber,
    );
    return result;
  }
}
