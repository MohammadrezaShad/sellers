import { DeleteSellerInput } from '../../dto/delete-seller.dto';

export class DeleteSellerCommand {
  constructor(public readonly deleteSellerInput: DeleteSellerInput) {}
}
