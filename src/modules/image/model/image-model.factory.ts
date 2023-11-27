import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';
import { CreateImageInput } from '@/modules/image/dto/create-image.dto';
import { ImageRepository } from '@/modules/image/image.repository';
import { Image } from '@/modules/image/model/image.model';

@Injectable()
export class ImageFactory implements ModelFactory<Image> {
  constructor(private readonly imageRepository: ImageRepository) {}
  async create(input: CreateImageInput): Promise<Image> {
    const { alt, filename, width, height, preview } = input;
    const newImage = new Image(
      new ObjectId().toHexString(),
      alt,
      filename,
      width,
      height,
      preview,
    );
    await this.imageRepository.create(newImage);
    return newImage;
  }
}
