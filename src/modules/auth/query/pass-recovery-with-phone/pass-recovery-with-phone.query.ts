export class PassRecoveryWithPhoneQuery {
  constructor(
    public readonly phone: string,
    public readonly code: number,
  ) {}
}
