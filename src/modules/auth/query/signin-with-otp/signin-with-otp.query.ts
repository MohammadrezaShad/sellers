export class SigninWithOtpQuery {
  constructor(
    public readonly phone: string,
    public readonly code: number,
  ) {}
}
