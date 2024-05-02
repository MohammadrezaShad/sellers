import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { ReportEntity, ReportEntitySchema } from './entity/report.entity';
import { ReportEntityFactory } from './entity/report.factory';
import { ReportHelepr } from './helper/report-helper';
import { ReportModelFactory } from './model/report-model.factory';
import { ReportQueryHandlers } from './query';
import { ReportRepository } from './report.repository';
import { ReportResolvers } from './report.resolver';
import { ReportUseCases } from './use-case';
import { ReportCommandHandlers } from './command';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: ReportEntity.name, schema: ReportEntitySchema },
    ]),
  ],
  providers: [
    ...ReportResolvers,
    ...ReportCommandHandlers,
    ...ReportQueryHandlers,
    ...ReportUseCases,
    ReportRepository,
    ReportModelFactory,
    ReportEntityFactory,
    ReportHelepr,
  ],
  exports: [],
})
@Global()
export class ReportModule {}
