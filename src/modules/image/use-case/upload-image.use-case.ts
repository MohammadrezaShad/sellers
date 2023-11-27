import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import * as path from 'path';
import * as sharp from 'sharp';

import { createdImageDirectory } from '@/common/utils/directories.util';
import { CreateImageCommand } from '@/modules/image/command/create-image';
import { CreateImageInput } from '@/modules/image/dto/create-image.dto';
import {
  UploadImageInput,
  UploadImageOutput,
} from '@/modules/image/dto/upload-image.dto';
import { ImageHelper } from '@/modules/image/helper/image.helper';

@Injectable()
export class UploadImageUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly imageHelper: ImageHelper,
  ) {}

  async uploadImage(
    uploadImageInput: UploadImageInput,
  ): Promise<UploadImageOutput> {
    try {
      console.log('use case');
      const { imageFile, alt } = uploadImageInput;
      await this.imageHelper.validateImageFileType(imageFile);

      // add to database
      const stream = imageFile.createReadStream();
      const sharpPipe = sharp();
      stream.pipe(sharpPipe);
      const metadata = await sharpPipe.metadata();
      const preview = await this.imageHelper.getPreviewOfImage({
        sharpPipe,
        metadata,
      });

      const createImageInput: CreateImageInput = {
        alt,
        filename: path.parse(imageFile.filename).name,
        width: metadata.width,
        height: metadata.height,
        preview,
      };

      const uploadedImage = await this.commandBus.execute(
        new CreateImageCommand(createImageInput),
      );

      const imageId: string = uploadedImage._id.toString();
      if (uploadedImage) {
        // add to directory
        const directory = createdImageDirectory(imageId);
        await sharpPipe
          .resize(metadata.width, metadata.height, {
            fit: 'cover',
          })
          .toFormat('webp', { lossless: false })
          .toFile(`${directory}/${imageId}.webp`);
      }

      return { success: true, imageId };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
