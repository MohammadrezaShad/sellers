import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { ImageCommandHandlers } from '@/modules/image/command';
import { ImageEntity, ImageSchema } from '@/modules/image/entity/image.entity';
import { ImageEntityFactory } from '@/modules/image/entity/image.factory';
import { ImageHelper } from '@/modules/image/helper/image.helper';
import { ImageController } from '@/modules/image/image.controller';
import { ImageRepository } from '@/modules/image/image.repository';
import { ImageResolvers } from '@/modules/image/image.resolver';
import { ImageFactory } from '@/modules/image/model/image-model.factory';
import { ImageQueryHandlers } from '@/modules/image/query';
import { ImageUseCases } from '@/modules/image/use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: ImageEntity.name, schema: ImageSchema },
    ]),
    HttpModule,
  ],
  controllers: [ImageController],
  providers: [
    ...ImageCommandHandlers,
    ...ImageQueryHandlers,
    ...ImageUseCases,
    ...ImageResolvers,
    ImageHelper,
    ImageRepository,
    ImageEntityFactory,
    ImageFactory,
  ],
  exports: [...ImageUseCases],
})
export class ImageModule {}
