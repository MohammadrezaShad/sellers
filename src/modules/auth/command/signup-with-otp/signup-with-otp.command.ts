export class SignupWithOtpCommand {
  constructor(
    public readonly phone: string,
    public readonly code: number,
  ) {}
}
