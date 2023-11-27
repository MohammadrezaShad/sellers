import { UpdateImageInput } from '@/modules/image/dto/update-image.dto';

export class UpdateImageCommand {
  constructor(readonly updateImageInput: UpdateImageInput) {}
}
