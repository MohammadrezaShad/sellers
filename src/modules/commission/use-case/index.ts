import { BulkDeleteCommissionUseCase } from './bulk-delete-commission.use-case';
import { CreateCommissionFromStaticExcelUseCase } from './create-commission-from-stastic-excel.use-case';
import { CreateCommissionUseCase } from './create-commission.use-case';
import { DeleteCommissionUseCase } from './delete-commission.use-case';
import { FindCommissionByIdUseCase } from './find-commission-by-id.use-case';
import { FindCommissionByIdsUseCase } from './find-commission-by-ids.use-case';
import { SearchCommissionUseCase } from './search-commission.use-case';
import { UpdateCommissionUseCase } from './update-commission.use-case';

export const CommissionUseCases = [
  CreateCommissionUseCase,
  UpdateCommissionUseCase,
  DeleteCommissionUseCase,
  SearchCommissionUseCase,
  FindCommissionByIdUseCase,
  FindCommissionByIdsUseCase,
  BulkDeleteCommissionUseCase,
  CreateCommissionFromStaticExcelUseCase,
];
