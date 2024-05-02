import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommissionCommandHandlers } from './command';
import {
  CommissionEntity,
  CommissionEntitySchema,
} from './entity/commission.entity';
import { CommissionEntityFactory } from './entity/commission.factory';
import { CommissionHelepr } from './helper/commission-helper';
import { CommissionQueryHandlers } from './query';
import { CommissionRepository } from './commission.repository';
import { CommissionResolvers } from './commission.resolver';
import { CommissionUseCases } from './use-case';
import { CommissionModelFactory } from './model/commission-model.factory';
import CommissionDataLoader from './commission.loader';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: CommissionEntity.name, schema: CommissionEntitySchema },
    ]),
  ],
  providers: [
    ...CommissionResolvers,
    ...CommissionCommandHandlers,
    ...CommissionQueryHandlers,
    ...CommissionUseCases,
    CommissionRepository,
    CommissionModelFactory,
    CommissionEntityFactory,
    CommissionHelepr,
    CommissionDataLoader,
  ],
  exports: [...CommissionUseCases],
})
@Global()
export class CommissionModule {}
