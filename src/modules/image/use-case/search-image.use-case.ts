import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { DEFAULT_COUNT } from '@/common/constants/pagination.constant';
import {
  SearchImagesInput,
  SearchImagesOutput,
} from '@/modules/image/dto/search-image.dto';
import { ImageEntityFactory } from '@/modules/image/entity/image.factory';
import { SearchImageQuery } from '@/modules/image/query/search-image';

@Injectable()
export class SearchImageUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly imageEntityFactory: ImageEntityFactory,
  ) {}
  async searchImage(
    searchImagesInput: SearchImagesInput,
  ): Promise<SearchImagesOutput> {
    try {
      const imageList = await this.queryBus.execute(
        new SearchImageQuery(searchImagesInput),
      );
      if (!imageList.length) {
        throw new NotFoundException('Image not found');
      }
      const imageEntityList = imageList.map(image =>
        this.imageEntityFactory.create(image),
      );
      return {
        success: true,
        results: imageEntityList,
        totalCount: imageList.length,
        totalPages: Math.ceil(
          imageList.length / (searchImagesInput.count || DEFAULT_COUNT),
        ),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
