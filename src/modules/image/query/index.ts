import { FindImageByIdsHandler } from '@/modules/image/query/find-image-by-ids';
import { SearchImageHandler } from '@/modules/image/query/search-image';

export const ImageQueryHandlers = [SearchImageHandler, FindImageByIdsHandler];
