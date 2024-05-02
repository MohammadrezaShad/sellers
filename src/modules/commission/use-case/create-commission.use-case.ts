import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateCommissionCommand } from '../command/create-commission/create-commission.command';
import {
  CreateCommissionInput,
  CreateCommissionOutput,
} from '../dto/create-commission.dto';
import { CommissionHelepr } from '../helper/commission-helper';

@Injectable()
export class CreateCommissionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly commissionHelper: CommissionHelepr,
  ) {}

  async createCommission(
    input: CreateCommissionInput,
  ): Promise<CreateCommissionOutput> {
    try {
      await this.commandBus.execute(new CreateCommissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
