import { Injectable } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

@Injectable()
export class ReportModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly seller: string,
    private readonly description: string,
    private readonly commission: string,
    private readonly netAmountAfterTaxDeduction: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getSeller(): string {
    return this.seller;
  }

  getDescription(): string {
    return this.description;
  }

  getCommission(): string {
    return this.commission;
  }

  getNetAmountAfterTaxDeduction(): string {
    return this.netAmountAfterTaxDeduction;
  }
}
