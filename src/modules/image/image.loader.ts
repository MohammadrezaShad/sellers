import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { FindImageByIdsUseCase } from '@/modules/image/use-case/find-image-by-ids.use-case';

@Injectable({ scope: Scope.REQUEST })
export default class ImageLoader {
  constructor(private readonly findImageByIdsUseCase: FindImageByIdsUseCase) {}

  public readonly batchImages = new DataLoader(
    async (imageIds: readonly string[]) => {
      const images = await this.findImageByIdsUseCase.findImageByIds(
        imageIds as string[],
      );
      const imagesMap = new Map(
        images.map(image => [image._id.toString(), image]),
      );
      const finalImages = imageIds.map(imageId => imagesMap.get(imageId));
      return finalImages;
    },
  );
}
