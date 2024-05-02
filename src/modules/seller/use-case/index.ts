import { BulkDeleteSellerUseCase } from './bulk-delete-seller.use-case';
import { CreateSellerFromStaticExcelUseCase } from './create-seller-from-stastic-excel.use-case';
import { CreateSellerUseCase } from './create-seller.use-case';
import { DeleteSellerUseCase } from './delete-seller.use-case';
import { FindSellerByIdUseCase } from './find-seller-by-id.use-case';
import { FindSellerByIdsUseCase } from './find-seller-by-ids.use-case';
import { FindSellerByNameUseCase } from './find-seller-by-name.use-case';
import { SearchSellerUseCase } from './search-seller.use-case';
import { UpdateSellerUseCase } from './update-seller.use-case';

export const SellerUseCases = [
  CreateSellerUseCase,
  UpdateSellerUseCase,
  DeleteSellerUseCase,
  SearchSellerUseCase,
  FindSellerByIdUseCase,
  FindSellerByIdsUseCase,
  FindSellerByNameUseCase,
  BulkDeleteSellerUseCase,
  CreateSellerFromStaticExcelUseCase,
];
