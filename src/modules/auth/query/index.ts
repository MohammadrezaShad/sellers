import { SigninHandler } from '@/modules/auth/query/signin-query/signin-handler';

import { GetProfileHandler } from './get-profile/get-profile.handler';
import { SigninWithOtpHandler } from './signin-with-otp/signin-with-otp.handler';

export const QueryHandlers = [
  SigninHandler,
  GetProfileHandler,
  SigninWithOtpHandler,
];
