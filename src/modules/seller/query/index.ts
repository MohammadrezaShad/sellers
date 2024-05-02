import { FindSellerByIdHanler } from './find-seller-by-id/find-seller-by-id.handler';
import { FindSellerByIdsHanler } from './find-seller-by-ids/find-seller-by-ids.handler';
import { FindSellerByNameAndBankAccountNumberHanler } from './find-seller-by-name-and-bank-account-number/find-seller-by-name-and-bank-account-number.handler';
import { FindSellerByNameAndNationalNumberHanler } from './find-seller-by-name-and-national-number/find-seller-by-name-and-national-number.handler';
import { FindSellerByNameHanler } from './find-seller-by-name/find-seller-by-name.handler';
import { SearchSellerHanler } from './search-seller/search-seller.handler';

export const SellerQueryHandlers = [
  SearchSellerHanler,
  FindSellerByIdHanler,
  FindSellerByIdsHanler,
  FindSellerByNameHanler,
  FindSellerByNameAndNationalNumberHanler,
  FindSellerByNameAndBankAccountNumberHanler,
];
