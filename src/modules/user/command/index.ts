import { CreateUserHandler } from '@/modules/user/command/create-user';
import { DeleteUserHandler } from '@/modules/user/command/delete-user/delete-user.handler';
import { UpdateUserHandler } from '@/modules/user/command/update-user/update-user.handler';
import { CreateUserWithOtpHandler } from './create-user-with-otp/create-user-with-otp.handler';
import { UpdatePasswordHandler } from './update-password/update-password.handler';

export const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  CreateUserWithOtpHandler,
  UpdatePasswordHandler,
];
