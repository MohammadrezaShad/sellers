import { InputType, ObjectType } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';

import { CoreOutput } from '@/common/dtos/output.dto';

@InputType('UploadFileInput')
export class UploadFileInput {
  excelFile?: FileUpload;
}

@InputType('UploadFilesInput')
export class UploadFilesInput {
  excelFiles: Promise<FileUpload>[];
}

@ObjectType()
export class UploadFileOutput extends CoreOutput {
  fileId: string;
}

@ObjectType()
export class UploadFilesOutput extends CoreOutput {
  fileIds: string[];
}
