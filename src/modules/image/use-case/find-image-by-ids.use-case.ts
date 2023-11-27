import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ImageEntity } from '@/modules/image/entity/image.entity';
import { ImageEntityFactory } from '@/modules/image/entity/image.factory';
import { FindImageByIdsQuery } from '@/modules/image/query/find-image-by-ids';

@Injectable()
export class FindImageByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly imageEntityFactory: ImageEntityFactory,
  ) {}

  async findImageByIds(idList: string[]): Promise<ImageEntity[] | null> {
    try {
      const images = await this.queryBus.execute(
        new FindImageByIdsQuery(idList),
      );
      if (images) {
        const imageEntityList = images.map(img =>
          this.imageEntityFactory.create(img),
        );
        return imageEntityList;
      }
      return images;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
