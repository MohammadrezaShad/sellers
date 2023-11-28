// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { SigninInput, SigninOutput } from '@/modules/auth/dto/signin.dto';
import { SigninQuery } from '@/modules/auth/query/signin-query/signin-query';

@Injectable()
export class SigninUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async signin({ phone, password }: SigninInput): Promise<SigninOutput> {
    try {
      const object = await this.queryBus.execute(
        new SigninQuery(phone, password),
      );
      return {
        success: true,
        accessToken: object.accessToken,
        refreshToken: object.refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
