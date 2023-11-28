import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { OtpEntity, OtpEntitySchema } from './entity/otp.entity';
import { UseCases } from './use-case';
import { OtpRepository } from './otp.repository';
import { OtpModelFactory } from './model/otp-model.factory';
import { OtpEntityFactory } from './entity/otp.factory';
import { CommandHandlers } from './command';
import { QueryHandlers } from './query';
import { OtpResolvers } from './otp.resolver';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: OtpEntity.name, schema: OtpEntitySchema },
    ]),
  ],
  providers: [
    ...OtpResolvers,
    ...CommandHandlers,
    ...QueryHandlers,
    ...UseCases,
    OtpRepository,
    OtpModelFactory,
    OtpEntityFactory,
  ],
  exports: [...UseCases],
})
@Global()
export class OtpModule {}
