import { BadRequestException, Injectable } from '@nestjs/common';

import { CommissionRepository } from '../commission.repository';
import { COMMISSION_ID_IS_NOT_CORRECT } from '../constant/error-message.constant';

@Injectable()
export class CommissionHelepr {
  constructor(private readonly commissionRepository: CommissionRepository) {}

  async validateCommissionId(commissionId: string) {
    const commission = await this.commissionRepository.findById({
      id: commissionId,
    });
    if (!commission || commission === null)
      throw new BadRequestException(COMMISSION_ID_IS_NOT_CORRECT);
  }

  // async validateSellerName(name: string, sellerId: string | null) {
  //   const seller = await this.sellerRepository.findOneItemByName(
  //     name,
  //     sellerId,
  //   );
  //   if (seller) throw new BadRequestException(SELLER_NAME_DUPLICATED);
  // }
}
