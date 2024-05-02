// Permission-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { SELLER_NOT_FOUND } from '../constant/error-message.constant';
import {
  FindSellerByNameInput,
  FindSellerOutput,
} from '../dto/find-seller.dto';
import { SellerEntityFactory } from '../entity/seller.factory';
import { SellerModel } from '../model/seller.model';
import { FindSellerByNameQuery } from '../query/find-seller-by-name/find-seller-by-name.query';

@Injectable()
export class FindSellerByNameUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly sellerFactory: SellerEntityFactory,
  ) {}

  async findSellerByName({
    name,
  }: FindSellerByNameInput): Promise<FindSellerOutput> {
    try {
      const seller: SellerModel = await this.queryBus.execute(
        new FindSellerByNameQuery(name),
      );
      if (!seller) {
        throw new NotFoundException(SELLER_NOT_FOUND);
      }
      return {
        success: true,
        result: this.sellerFactory.create(seller),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
