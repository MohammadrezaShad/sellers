import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ImageRepository } from '@/modules/image/image.repository';
import { Image } from '@/modules/image/model/image.model';
import { SearchImageQuery } from '@/modules/image/query/search-image/search-image.query';

@QueryHandler(SearchImageQuery)
export class SearchImageHandler implements IQueryHandler<SearchImageQuery> {
  constructor(private readonly imageRepository: ImageRepository) {}
  async execute({ data }: SearchImageQuery): Promise<Image[] | null> {
    return this.imageRepository.search(data);
  }
}
