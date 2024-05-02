// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateCommissionCommand } from '../command/update-commission/update-commission.command';
import {
  UpdateCommissionInput,
  UpdateCommissionOutput,
} from '../dto/update-commission.dto';
import { CommissionHelepr } from '../helper/commission-helper';

@Injectable()
export class UpdateCommissionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly commissionHelper: CommissionHelepr,
  ) {}

  async updateCommission(
    input: UpdateCommissionInput,
  ): Promise<UpdateCommissionOutput> {
    try {
      await this.commissionHelper.validateCommissionId(input.commissionId);

      await this.commandBus.execute(new UpdateCommissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
