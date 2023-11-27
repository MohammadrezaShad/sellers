import { CreateUserHandler } from '@/modules/user/command/create-user';
import { DeleteUserHandler } from '@/modules/user/command/delete-user/delete-user.handler';
import { UpdateUserHandler } from '@/modules/user/command/update-user/update-user.handler';

export const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];
