import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

import { AuthResolvers } from '@/modules/auth/auth.resolver';
import { CommandHandlers } from '@/modules/auth/command';
import { PermissionModule } from '@/modules/auth/components/permission/permission.module';
import { RoleModule } from '@/modules/auth/components/role/role.module';
import { QueryHandlers } from '@/modules/auth/query';
import { AccessTokenStrategy } from '@/modules/auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from '@/modules/auth/strategies/refresh-token.strategy';
import { UseCases } from '@/modules/auth/use-case';
import { TokenHelper } from '@/modules/auth/utils/token.helper';
import { UserEntityFactory } from '@/modules/user/entity/user.factory';
import { UserModule } from '@/modules/user/user.module';

import { OtpModule } from './components/otp/otp.module';

@Module({
  imports: [
    CqrsModule,
    JwtModule.register({}),
    UserModule,
    PermissionModule,
    RoleModule,
    OtpModule,
  ],
  providers: [
    ...AuthResolvers,
    ...CommandHandlers,
    ...QueryHandlers,
    ...UseCases,
    UserEntityFactory,
    TokenHelper,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
