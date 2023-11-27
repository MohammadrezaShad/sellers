import { CreateImageInput } from '@/modules/image/dto/create-image.dto';

export class CreateImageCommand {
  constructor(readonly createImageInput: CreateImageInput) {}
}
