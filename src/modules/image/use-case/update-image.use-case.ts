import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateImageCommand } from '@/modules/image/command/update-image/update-image.command';
import {
  UpdateImageInput,
  UpdateImageOutput,
} from '@/modules/image/dto/update-image.dto';
import { ImageHelper } from '@/modules/image/helper/image.helper';

@Injectable()
export class UpdateImageUseCase {
  constructor(
    private readonly imageHelper: ImageHelper,
    private readonly commandBus: CommandBus,
  ) {}

  async updateImage(input: UpdateImageInput): Promise<UpdateImageOutput> {
    try {
      await this.imageHelper.validateImageId(input.id);

      await this.commandBus.execute(new UpdateImageCommand(input));

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
