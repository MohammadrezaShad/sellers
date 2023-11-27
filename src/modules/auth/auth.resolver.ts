import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import {
  PermissionMutation,
  PermissionQuery,
} from '@/modules/auth/components/permission/dto/permission.dto';
import {
  RoleMutation,
  RoleQuery,
} from '@/modules/auth/components/role/dto/role.dto';
import { GetRefreshToken } from '@/modules/auth/decorators/get-refresh-token.decorator';
import { GetUser } from '@/modules/auth/decorators/get-user.decorator';
import { AuthMutation, AuthQuery } from '@/modules/auth/dto/auth.dto';
import { LogoutOutput } from '@/modules/auth/dto/logout.dto';
import { RefreshTokenOutput } from '@/modules/auth/dto/refresh-token.dto';
import { SigninInput, SigninOutput } from '@/modules/auth/dto/signin.dto';
import { SignupInput, SignupOutput } from '@/modules/auth/dto/signup.dto';
import { RefreshTokenGuard } from '@/modules/auth/guards/refresh-token.guard';
import { LogoutUseCase } from '@/modules/auth/use-case/logout.use-case';
import { RefreshTokenUseCase } from '@/modules/auth/use-case/refresh-token.use-case';
import { SigninUseCase } from '@/modules/auth/use-case/signin.use-case';
import { SignupUseCase } from '@/modules/auth/use-case/signup.use-case';
import { TUser } from '@/modules/user/entity/user.entity';

@Resolver(AuthQuery)
export class AuthQueryResolver {
  constructor(private readonly singinUseCase: SigninUseCase) {}

  @Query(() => AuthQuery)
  async auth(): Promise<AuthQuery> {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => RoleQuery)
  async role() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => PermissionQuery)
  async permission() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => SigninOutput)
  async signin(@Args('input') input: SigninInput): Promise<SigninOutput> {
    return this.singinUseCase.signin(input);
  }
}

@Resolver(AuthMutation)
export class AuthMutationResolver {
  constructor(
    private readonly signupUseCase: SignupUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Mutation(() => AuthMutation)
  async auth(): Promise<AuthMutation> {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => RoleMutation)
  async role() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => PermissionMutation)
  async permission() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => SignupOutput)
  async signup(@Args('input') signupInput: SignupInput): Promise<SignupOutput> {
    return this.signupUseCase.signup(signupInput);
  }

  @UseGuards(RefreshTokenGuard)
  @ResolveField(() => LogoutOutput)
  async logout(
    @GetUser() user: TUser,
    @GetRefreshToken() refreshToken: string,
  ): Promise<LogoutOutput> {
    return this.logoutUseCase.logout(user._id, refreshToken);
  }

  @UseGuards(RefreshTokenGuard)
  @ResolveField(() => RefreshTokenOutput)
  async refreshToken(
    @GetUser() user: TUser,
    @GetRefreshToken() refreshToken: string,
  ): Promise<RefreshTokenOutput> {
    const userId = user._id;
    return this.refreshTokenUseCase.refreshToken(userId, refreshToken);
  }
}

export const AuthResolvers = [AuthQueryResolver, AuthMutationResolver];
