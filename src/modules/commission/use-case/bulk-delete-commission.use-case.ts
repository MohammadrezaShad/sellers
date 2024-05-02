// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BulkDeleteCommissionCommand } from '../command/bulk-delete-commission/bulk-delete-commission.command';
import {
  BulkDeleteCommissionInput,
  DeleteCommissionOutput,
} from '../dto/delete-commission.dto';
import { CommissionHelepr } from '../helper/commission-helper';

@Injectable()
export class BulkDeleteCommissionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly commissionHelper: CommissionHelepr,
  ) {}

  async bulkDeleteCommission(
    input: BulkDeleteCommissionInput,
  ): Promise<DeleteCommissionOutput> {
    try {
      for (const commissionId of input.ids) {
        await this.commissionHelper.validateCommissionId(commissionId);
      }
      await this.commandBus.execute(new BulkDeleteCommissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
