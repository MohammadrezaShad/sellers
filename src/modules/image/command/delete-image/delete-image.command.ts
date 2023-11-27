import { DeleteImageInput } from '@/modules/image/dto/delete-image.dto';

export class DeleteImageCommand {
  constructor(readonly deleteImageInput: DeleteImageInput) {}
}
