import { BadRequestException, Injectable } from '@nestjs/common';

import { SellerRepository } from '../seller.repository';
import {
  SELLER_ID_IS_NOT_CORRECT,
  SELLER_NAME_DUPLICATED,
  SELLER_TITLE_DUPLICATED,
} from '../constant/error-message.constant';

@Injectable()
export class SellerHelepr {
  constructor(private readonly sellerRepository: SellerRepository) {}

  async validateSellerId(sellerId: string) {
    const seller = await this.sellerRepository.findById({ id: sellerId });
    if (!seller || seller === null)
      throw new BadRequestException(SELLER_ID_IS_NOT_CORRECT);
  }

  // async validateSellerName(name: string, sellerId: string | null) {
  //   const seller = await this.sellerRepository.findOneItemByName(
  //     name,
  //     sellerId,
  //   );
  //   if (seller) throw new BadRequestException(SELLER_NAME_DUPLICATED);
  // }
}
