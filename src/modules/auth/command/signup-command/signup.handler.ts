import { BadRequestException } from '@nestjs/common';
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';

import { SignupCommand } from '@/modules/auth/command/signup-command/signup.command';
import { CreateUserCommand } from '@/modules/user/command/create-user';
import { USER_ALREADY_EXISTS } from '@/modules/user/constant/error-message.constant';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByEmailQuery } from '@/modules/user/query/find-by-email/find-user-by-email.query';

@CommandHandler(SignupCommand)
export class SignupHandler implements ICommandHandler<SignupCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: SignupCommand) {
    const user: UserModel = await this.queryBus.execute(
      new FindUserByEmailQuery(command.email, false),
    );
    if (user) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }
    await this.commandBus.execute(new CreateUserCommand(command));
  }
}
