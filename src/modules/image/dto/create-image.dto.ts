import { InputType, PickType } from '@nestjs/graphql';

import { ImageEntity } from '@/modules/image/entity/image.entity';

@InputType()
export class CreateImageInput extends PickType(ImageEntity, [
  'alt',
  'filename',
  'width',
  'height',
  'preview',
]) {}
