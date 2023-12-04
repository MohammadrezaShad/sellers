import { LogoutUseCase } from '@/modules/auth/use-case/logout.use-case';
import { RefreshTokenUseCase } from '@/modules/auth/use-case/refresh-token.use-case';
import { SendPassRecoverySmsUseCase } from '@/modules/auth/use-case/send-pass-recovery-sms.use-case';
import { SigninUseCase } from '@/modules/auth/use-case/signin.use-case';
import { SigninWithOtpUseCase } from '@/modules/auth/use-case/signin-with-otp.use-case';
import { SignupUseCase } from '@/modules/auth/use-case/signup.use-case';

import { GetProfileUseCase } from './get-profile.use-case';
import { PassRecoveryWithPhoneUseCase } from './pass-recovery-with-phone.use-case';
import { SendSigninSmsUseCase } from './send-signin-sms.use-case';
import { SignupWithPhoneUseCase } from './signup-with-phone.use-case';
import { ValidateVerificationCodeUseCase } from './validate-verification-code.use-case';

export const UseCases = [
  SignupUseCase,
  SigninUseCase,
  LogoutUseCase,
  RefreshTokenUseCase,
  SendSigninSmsUseCase,
  SigninWithOtpUseCase,
  GetProfileUseCase,
  SendPassRecoverySmsUseCase,
  PassRecoveryWithPhoneUseCase,
  SignupWithPhoneUseCase,
  ValidateVerificationCodeUseCase,
];
