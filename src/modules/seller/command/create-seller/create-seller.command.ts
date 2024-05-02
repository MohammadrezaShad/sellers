import { CreateSellerInput } from '../../dto/create-seller.dto';

export class CreateSellerCommand {
  constructor(public readonly createSellerInput: CreateSellerInput) {}
}
