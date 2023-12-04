import { Injectable } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

@Injectable()
export class OtpModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly phone: string,
    private readonly code: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getPhone(): string {
    return this.phone;
  }

  getCode(): string {
    return this.code;
  }
}
