import {
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
import * as fs from 'fs';
import * as sharp from 'sharp';

import {
  createdCachedImagesDirectory,
  getImageDirectory,
} from '@/common/utils/directories.util';
import { isNullOrUndefined } from '@/common/utils/is-null-or-undefined';
import { ServeImageInputDto } from '@/modules/image/dto/serve-image.dto';

@Injectable()
export class ServeImageUseCase {
  constructor() {}
  async serveImage({
    id,
    width,
    quality: inputQuality,
    response,
  }: ServeImageInputDto) {
    try {
      const quality =
        !isNullOrUndefined(inputQuality) &&
        inputQuality > 0 &&
        inputQuality <= 100
          ? inputQuality
          : 100;
      const directory = getImageDirectory(id);
      const imagePath = `${directory}/${id}.webp`;

      const cachePath = `${createdCachedImagesDirectory()}/${id}_${width}_${quality}.webp`;

      if (!fs.existsSync(imagePath)) return null;

      if (fs.existsSync(cachePath)) {
        const cacheFile = fs.createReadStream(cachePath);
        cacheFile.pipe(response);
      } else {
        const file = fs.createReadStream(imagePath);
        const convertedImage =
          !isNullOrUndefined(width) && width > 0
            ? sharp().resize(width).toFormat('webp', { lossless: false }).webp({
                quality,
              })
            : sharp().toFormat('webp', { lossless: false }).webp({
                quality,
              });
        file.pipe(convertedImage).pipe(response);
        const cacheFile = fs.createWriteStream(cachePath);
        convertedImage.pipe(cacheFile);
        return new StreamableFile(convertedImage);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
