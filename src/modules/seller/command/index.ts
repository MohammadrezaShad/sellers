import { BulkDeleteSellerHandler } from './bulk-delete-seller/bulk-delete-seller.handler';
import { CreateSellerHandler } from './create-seller/create-seller.handler';
import { DeleteSellerHandler } from './delete-seller/delete-seller.handler';
import { UpdateSellerHandler } from './update-seller/update-seller.handler';

export const SellerCommandHandlers = [
  CreateSellerHandler,
  UpdateSellerHandler,
  DeleteSellerHandler,
  BulkDeleteSellerHandler,
];
