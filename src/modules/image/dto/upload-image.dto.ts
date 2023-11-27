import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';

import { CoreOutput } from '@/common/dtos/output.dto';
import { ImageEntity } from '@/modules/image/entity/image.entity';

@InputType('UploadImageInputType')
export class UploadImageInput extends PickType(ImageEntity, ['alt']) {
  imageFile: FileUpload;
}

@InputType('UploadImagesInputType')
export class UploadImagesInput {
  imageFiles: Promise<FileUpload>[];
}

@ObjectType()
export class UploadImageOutput extends CoreOutput {
  imageId: string;
}

@ObjectType()
export class UploadImagesOutput extends CoreOutput {
  imageIds: string[];
}
