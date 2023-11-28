import { BadRequestException } from '@nestjs/common';
import {
  CommandHandler,
  EventPublisher,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';

import { CreateUserCommand } from '@/modules/user/command/create-user/create-user.command';
import { USER_ALREADY_EXISTS } from '@/modules/user/constant/error-message.constant';
import { UserModel } from '@/modules/user/model/user.model';
import { UserModelFactory } from '@/modules/user/model/user-model.factory';
import { FindUserByPhoneQuery } from '../../query/find-user-by-phone/find-user-by-phone.query';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly userFactory: UserModelFactory,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: CreateUserCommand) {
    const { createUserInput } = command;

    const user: UserModel = await this.queryBus.execute(
      new FindUserByPhoneQuery(createUserInput.phone, false),
    );
    if (user) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }

    const newUser = this.publisher.mergeObjectContext(
      await this.userFactory.create(createUserInput),
    );
    newUser.commit();
  }
}
