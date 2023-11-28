import { SigninHandler } from '@/modules/auth/query/signin-query/signin-handler';
import { SigninWithOtpHandler } from './signin-with-otp/signin-with-otp.handler';

export const QueryHandlers = [SigninHandler, SigninWithOtpHandler];
