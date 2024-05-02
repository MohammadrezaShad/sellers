import { BulkDeleteCommissionHandler } from './bulk-delete-commission/bulk-delete-commission.handler';
import { CreateCommissionHandler } from './create-commission/create-commission.handler';
import { DeleteCommissionHandler } from './delete-commission/delete-commission.handler';
import { UpdateCommissionHandler } from './update-commission/update-commission.handler';

export const CommissionCommandHandlers = [
  CreateCommissionHandler,
  UpdateCommissionHandler,
  DeleteCommissionHandler,
  BulkDeleteCommissionHandler,
];
