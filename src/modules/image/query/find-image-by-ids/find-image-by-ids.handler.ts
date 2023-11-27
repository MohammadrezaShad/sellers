import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ImageRepository } from '@/modules/image/image.repository';
import { Image } from '@/modules/image/model/image.model';
import { FindImageByIdsQuery } from '@/modules/image/query/find-image-by-ids/find-image-by-ids.query';

@QueryHandler(FindImageByIdsQuery)
export class FindImageByIdsHandler
  implements IQueryHandler<FindImageByIdsQuery>
{
  constructor(private readonly imageRepository: ImageRepository) {}
  async execute({ idList }: FindImageByIdsQuery): Promise<Image[] | null> {
    return this.imageRepository.findManyById(idList);
  }
}
