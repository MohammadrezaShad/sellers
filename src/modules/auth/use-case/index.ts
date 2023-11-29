import { LogoutUseCase } from '@/modules/auth/use-case/logout.use-case';
import { RefreshTokenUseCase } from '@/modules/auth/use-case/refresh-token.use-case';
import { SigninUseCase } from '@/modules/auth/use-case/signin.use-case';
import { SignupUseCase } from '@/modules/auth/use-case/signup.use-case';
import { SigninWithOtpUseCase } from './signin-with-otp.use-case';
import { GetProfileUseCase } from './get-profile.use-case';

export const UseCases = [
  SignupUseCase,
  SigninUseCase,
  LogoutUseCase,
  RefreshTokenUseCase,
  SigninWithOtpUseCase,
  GetProfileUseCase,
];
