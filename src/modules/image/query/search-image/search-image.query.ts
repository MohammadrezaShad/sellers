import { SearchImagesInput } from '@/modules/image/dto/search-image.dto';

export class SearchImageQuery {
  constructor(readonly data: SearchImagesInput) {}
}
