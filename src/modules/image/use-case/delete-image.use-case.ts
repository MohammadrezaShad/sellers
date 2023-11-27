import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteImageCommand } from '@/modules/image/command/delete-image';
import {
  DeleteImageInput,
  DeleteImageOutput,
} from '@/modules/image/dto/delete-image.dto';
import { ImageHelper } from '@/modules/image/helper/image.helper';

@Injectable()
export class DeleteImageUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly imageHelper: ImageHelper,
  ) {}

  async deleteImage(input: DeleteImageInput): Promise<DeleteImageOutput> {
    try {
      await this.imageHelper.validateImageId(input.id);
      await this.commandBus.execute(new DeleteImageCommand(input));

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
