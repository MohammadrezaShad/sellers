export class FindUserByPhoneQuery {
  constructor(
    public readonly phone: string,
    public readonly isPasswordSelected?: boolean,
  ) {}
}
