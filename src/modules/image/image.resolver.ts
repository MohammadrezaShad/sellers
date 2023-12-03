import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import { CoreOutput } from '@/common/dtos/output.dto';
import {
  DeleteImageInput,
  DeleteImageOutput,
} from '@/modules/image/dto/delete-image.dto';
import { ImageMutation, ImageQuery } from '@/modules/image/dto/image.dto';
import {
  SearchImagesInput,
  SearchImagesOutput,
} from '@/modules/image/dto/search-image.dto';
import {
  UpdateImageInput,
  UpdateImageOutput,
} from '@/modules/image/dto/update-image.dto';
import {
  UploadImageInput,
  UploadImageOutput,
} from '@/modules/image/dto/upload-image.dto';
import { DeleteImageUseCase } from '@/modules/image/use-case/delete-image.use-case';
import { SearchImageUseCase } from '@/modules/image/use-case/search-image.use-case';
import { UpdateImageUseCase } from '@/modules/image/use-case/update-image.use-case';
import { UploadImageUseCase } from '@/modules/image/use-case/upload-image.use-case';
import { PanelGuard } from '../auth/guards/panel.guard';
import { Permission } from '@/common/permissions/permission-type';

@Resolver(() => ImageQuery)
export class ImageQueryResolver {
  constructor(private readonly searchImageUseCase: SearchImageUseCase) {}

  @Query(() => ImageQuery)
  async image() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => SearchImagesOutput)
  async searchImage(
    @Args('input') input: SearchImagesInput,
  ): Promise<SearchImagesOutput> {
    return this.searchImageUseCase.searchImage(input);
  }
}
@Resolver(() => ImageMutation)
export class ImageMutationResolver {
  constructor(
    private readonly uploadImageUseCase: UploadImageUseCase,
    private readonly updateImageUseCase: UpdateImageUseCase,
    private readonly deleteImageUseCase: DeleteImageUseCase,
  ) {}

  @Mutation(() => ImageMutation)
  async image() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => UploadImageOutput)
  @PanelGuard<MethodDecorator>(Permission.UPLOAD_IMAGE)
  async uploadImage(
    @Args('input', { type: () => UploadImageInput, nullable: true })
    input: UploadImageInput,
    @Args('file', { type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<CoreOutput> {
    console.log('resolver');
    return this.uploadImageUseCase.uploadImage({ ...input, imageFile: file });
  }

  @ResolveField(() => UpdateImageOutput)
  @PanelGuard<MethodDecorator>(Permission.UPDATE_IMAGE, Permission.UPDATE)
  async updateImage(
    @Args('input') input: UpdateImageInput,
  ): Promise<UpdateImageOutput> {
    return await this.updateImageUseCase.updateImage(input);
  }

  @ResolveField(() => DeleteImageOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_IMAGE, Permission.DELETE)
  async deleteImage(
    @Args('input') input: DeleteImageInput,
  ): Promise<DeleteImageOutput> {
    return await this.deleteImageUseCase.deleteImage(input);
  }
}

export const ImageResolvers = [ImageMutationResolver, ImageQueryResolver];
