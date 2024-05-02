export class FindSellerByNameAndNationalNumberQuery {
  constructor(
    readonly name: string,
    readonly nationalNumber: string,
  ) {}
}
