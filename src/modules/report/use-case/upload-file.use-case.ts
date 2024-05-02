import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import * as xlsx from 'xlsx';

import { UploadFileInput, UploadFileOutput } from '../dto/upload-file.dto';

@Injectable()
export class UploadFileUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async uploadFile(
    uploadfileInput: UploadFileInput,
  ): Promise<UploadFileOutput> {
    try {
      const { excelFile } = uploadfileInput;

      // add to database
      const stream = excelFile.createReadStream();

      console.log(stream);
      //   const sharpPipe = sharp();
      //   stream.pipe(sharpPipe);
      //   const metadata = await sharpPipe.metadata();
      //   const preview = await this.imageHelper.getPreviewOfImage({
      //     sharpPipe,
      //     metadata,
      //   });

      //   const createImageInput: CreateImageInput = {
      //     alt,
      //     filename: path.parse(excelFile.filename).name,
      //     width: metadata.width,
      //     height: metadata.height,
      //     preview,
      //   };

      //   const uploadedImage = await this.commandBus.execute(
      //     new CreateImageCommand(createImageInput),
      //   );

      //   const fileId: string = uploadedImage._id.toString();
      //   if (uploadedImage) {
      //     // add to directory
      //     const directory = createdImageDirectory(fileId);
      //     await sharpPipe
      //       .resize(metadata.width, metadata.height, {
      //         fit: 'cover',
      //       })
      //       .toFormat('webp', { lossless: false })
      //       .toFile(`${directory}/${fileId}.webp`);
      //   }

      return { success: true, fileId: '55' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
