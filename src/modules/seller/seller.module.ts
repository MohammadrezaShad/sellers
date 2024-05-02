import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { SellerCommandHandlers } from './command';
import { SellerEntity, SellerEntitySchema } from './entity/seller.entity';
import { SellerEntityFactory } from './entity/seller.factory';
import { SellerHelepr } from './helper/seller-helper';
import { SellerModelFactory } from './model/seller-model.factory';
import { SellerQueryHandlers } from './query';
import { SellerRepository } from './seller.repository';
import { SellerResolvers } from './seller.resolver';
import { SellerUseCases } from './use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: SellerEntity.name, schema: SellerEntitySchema },
    ]),
  ],
  providers: [
    ...SellerResolvers,
    ...SellerCommandHandlers,
    ...SellerQueryHandlers,
    ...SellerUseCases,
    SellerRepository,
    SellerModelFactory,
    SellerEntityFactory,
    SellerHelepr,
  ],
  exports: [...SellerUseCases],
})
@Global()
export class SellerModule {}
