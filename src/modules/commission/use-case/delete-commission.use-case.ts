// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteCommissionCommand } from '../command/delete-commission/delete-commission.command';
import {
  DeleteCommissionInput,
  DeleteCommissionOutput,
} from '../dto/delete-commission.dto';
import { CommissionHelepr } from '../helper/commission-helper';

@Injectable()
export class DeleteCommissionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly commissionHelper: CommissionHelepr,
  ) {}

  async deleteCommission(
    input: DeleteCommissionInput,
  ): Promise<DeleteCommissionOutput> {
    try {
      await this.commissionHelper.validateCommissionId(input.commissionId);
      await this.commandBus.execute(new DeleteCommissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
