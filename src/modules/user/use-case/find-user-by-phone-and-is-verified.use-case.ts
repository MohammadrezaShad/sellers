// user-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { USER_NOT_FOUND } from '@/modules/user/constant/error-message.constant';
import {
  FindUserByPhoneInput,
  FindUserOutput,
} from '@/modules/user/dto/find-user.dto';
import { UserEntityFactory } from '@/modules/user/entity/user.factory';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByPhoneAndIsVerifiedQuery } from '../query/find-user-by-phone-and-is-verified/find-user-by-phone-and-is-verified.query';

@Injectable()
export class FindUserByPhoneAndIsVerifiedUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userFactory: UserEntityFactory,
  ) {}

  async findUserByPhoneAndIsVerified(
    { phone }: FindUserByPhoneInput,
    isPasswordSelected?: boolean,
  ): Promise<FindUserOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindUserByPhoneAndIsVerifiedQuery(phone, isPasswordSelected),
      );

      if (!user) {
        throw new NotFoundException(USER_NOT_FOUND);
      }
      return {
        success: true,
        result: this.userFactory.create(user),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
