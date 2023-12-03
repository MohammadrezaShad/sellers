import { LogoutHandler } from '@/modules/auth/command/logout-command/logout.handler';
import { RefreshTokenHandler } from '@/modules/auth/command/refresh-token-command/refresh-token.handler';
import { SignupHandler } from '@/modules/auth/command/signup-command/signup.handler';
import { SignupWithOtpHandler } from './signup-with-otp/signup-with-otp.handler';

export const CommandHandlers = [
  SignupHandler,
  LogoutHandler,
  RefreshTokenHandler,
  SignupWithOtpHandler,
];
