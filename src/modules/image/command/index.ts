import { CreateImageHandler } from '@/modules/image/command/create-image';
import { DeleteImageHandler } from '@/modules/image/command/delete-image';
import { UpdataImageHandler } from '@/modules/image/command/update-image';

export const ImageCommandHandlers = [
  CreateImageHandler,
  UpdataImageHandler,
  DeleteImageHandler,
];
