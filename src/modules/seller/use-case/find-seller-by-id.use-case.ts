// Permission-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { SELLER_NOT_FOUND } from '../constant/error-message.constant';
import { FindSellerByIdInput, FindSellerOutput } from '../dto/find-seller.dto';
import { SellerEntityFactory } from '../entity/seller.factory';
import { SellerModel } from '../model/seller.model';
import { FindSellerByIdQuery } from '../query/find-seller-by-id/find-seller-by-id.query';

@Injectable()
export class FindSellerByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly sellerFactory: SellerEntityFactory,
  ) {}

  async findSellerByid({ id }: FindSellerByIdInput): Promise<FindSellerOutput> {
    try {
      const seller: SellerModel = await this.queryBus.execute(
        new FindSellerByIdQuery({ id: id }),
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
