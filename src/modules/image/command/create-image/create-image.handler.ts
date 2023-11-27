import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateImageCommand } from '@/modules/image/command/create-image/create-image.command';
import { Image } from '@/modules/image/model/image.model';
import { ImageFactory } from '@/modules/image/model/image-model.factory';

@CommandHandler(CreateImageCommand)
export class CreateImageHandler implements ICommandHandler<CreateImageCommand> {
  constructor(private readonly imageFactory: ImageFactory) {}
  async execute({ createImageInput }: CreateImageCommand): Promise<Image> {
    return await this.imageFactory.create(createImageInput);
  }
}
