import { BulkDeleteSellerInput } from '../../dto/delete-seller.dto';

export class BulkDeleteSellerCommand {
  constructor(public readonly bulkDeleteSellerInput: BulkDeleteSellerInput) {}
}
