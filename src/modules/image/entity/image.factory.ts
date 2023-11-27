import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';
import { ImageEntity } from '@/modules/image/entity/image.entity';
import { Image } from '@/modules/image/model/image.model';

export class ImageEntityFactory
  implements ModelEntityFactory<ImageEntity, Image>
{
  create(image: Image): ImageEntity {
    return {
      _id: new ObjectId(image.getId()),
      alt: image.getAlt(),
      filename: image.getFileName(),
      width: image.getWidth(),
      height: image.getHeight(),
      preview: image.getPreview(),
    };
  }
  createFromEntity(imageEntity: ImageEntity): Image {
    const { _id, alt, filename, width, height, preview } = imageEntity;
    return new Image(_id.toHexString(), alt, filename, width, height, preview);
  }
}
