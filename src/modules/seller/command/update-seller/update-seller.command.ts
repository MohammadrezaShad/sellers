import { UpdateSellerInput } from '../../dto/update-seller.dto';

export class UpdateSellerCommand {
  constructor(public readonly updateSellerInput: UpdateSellerInput) {}
}
