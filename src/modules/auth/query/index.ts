import { SigninHandler } from '@/modules/auth/query/signin-query/signin-handler';
import { SigninWithOtpHandler } from './signin-with-otp/signin-with-otp.handler';
import { GetProfileHandler } from './get-profile/get-profile.handler';

export const QueryHandlers = [
  SigninHandler,
  GetProfileHandler,
  SigninWithOtpHandler,
];
