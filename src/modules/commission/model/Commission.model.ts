import { Injectable } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

@Injectable()
export class CommissionModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly seller: string,
    private readonly percent: string,
    private readonly lifeInsurancePremium: string,
    private readonly additionalInsurancePremium: string,
    private readonly insurancePremium: string,
    private readonly lifeInsuranceCommission: string,
    private readonly additionalInsuranceCommission: string,
    private readonly totalCommission: string,
    private readonly debt: string,
    private readonly totalCommssionAfterDeductingDebt: string,
    private readonly depositTaminEjtemaei: string,
    private readonly totalCommssionAfterDeductingDebtAndDepositTaminEjtemaei: string,
    private readonly date: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  public getSeller() {
    return this.seller;
  }

  public getPercent() {
    return this.percent;
  }

  public getLifeInsurancePremium() {
    return this.lifeInsurancePremium;
  }

  public getAdditionalInsurancePremium() {
    return this.additionalInsurancePremium;
  }

  public getInsurancePremium() {
    return this.insurancePremium;
  }

  public getLifeInsuranceCommission() {
    return this.lifeInsuranceCommission;
  }

  public getAdditionalInsuranceCommission() {
    return this.additionalInsuranceCommission;
  }

  public getTotalCommission() {
    return this.totalCommission;
  }

  public getDebt() {
    return this.debt;
  }

  public getTotalCommssionAfterDeductingDebt() {
    return this.totalCommssionAfterDeductingDebt;
  }

  public getDepositTaminEjtemaei() {
    return this.depositTaminEjtemaei;
  }

  public getTotalCommssionAfterDeductingDebtAndDepositTaminEjtemaei() {
    return this.totalCommssionAfterDeductingDebtAndDepositTaminEjtemaei;
  }

  public getDate() {
    return this.date;
  }
}
