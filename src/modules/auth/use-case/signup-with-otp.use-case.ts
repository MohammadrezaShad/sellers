// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { SignupWithOtpCommand } from '../command/signup-with-otp/signup-with-otp.command';
import { SignupWithOtpInput, SignupWithOtpOutput } from '../dto/signup.dto';

@Injectable()
export class SignupWithOtpUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async signupWithOtp({
    phone,
    code,
  }: SignupWithOtpInput): Promise<SignupWithOtpOutput> {
    try {
      const object = await this.commandBus.execute(
        new SignupWithOtpCommand(phone, code),
      );
      return {
        success: true,
        accessToken: object.accessToken,
        refreshToken: object.refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
