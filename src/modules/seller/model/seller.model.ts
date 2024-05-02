import { Injectable } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

@Injectable()
export class SellerModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly marketerCode: string,
    private readonly nationalNumber: string,
    private readonly bankAccountNumber: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getMarketerCode(): string {
    return this.marketerCode;
  }

  getNationalNumber(): string {
    return this.nationalNumber;
  }

  getBankAccountNumber(): string {
    return this.bankAccountNumber;
  }
}
