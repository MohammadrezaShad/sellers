import { DeleteImageUseCase } from '@/modules/image/use-case/delete-image.use-case';
import { FindImageByIdsUseCase } from '@/modules/image/use-case/find-image-by-ids.use-case';
import { SearchImageUseCase } from '@/modules/image/use-case/search-image.use-case';
import { ServeImageUseCase } from '@/modules/image/use-case/serve-image.use-case';
import { UpdateImageUseCase } from '@/modules/image/use-case/update-image.use-case';
import { UploadImageUseCase } from '@/modules/image/use-case/upload-image.use-case';

export const ImageUseCases = [
  SearchImageUseCase,
  UploadImageUseCase,
  UpdateImageUseCase,
  DeleteImageUseCase,
  ServeImageUseCase,
  FindImageByIdsUseCase,
];
