import { BadRequestException } from '@nestjs/common';
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';

import { SignupCommand } from '@/modules/auth/command/signup/signup.command';
import { CreateUserCommand } from '@/modules/user/command/create-user';
import { USER_ALREADY_EXISTS } from '@/modules/user/constant/error-message.constant';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByPhoneAndIsVerifiedQuery } from '@/modules/user/query/find-user-by-phone-and-is-verified/find-user-by-phone-and-is-verified.query';

@CommandHandler(SignupCommand)
export class SignupHandler implements ICommandHandler<SignupCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(command: SignupCommand) {
    const user: UserModel = await this.queryBus.execute(
      new FindUserByPhoneAndIsVerifiedQuery(command.phone, false),
    );
    if (user) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }
    await this.commandBus.execute(new CreateUserCommand(command));
  }
}
