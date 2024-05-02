export class FindSellerByNameAndBankAccountNumberQuery {
  constructor(
    readonly name: string,
    readonly bankAccountNumber: string,
  ) {}
}
