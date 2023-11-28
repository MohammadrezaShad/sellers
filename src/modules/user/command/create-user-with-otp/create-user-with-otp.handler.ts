import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../user.repository';
import { CreateUserWithOtpCommand } from './create-user-with-otp.command';
import { UserModel } from '../../model/user.model';

@CommandHandler(CreateUserWithOtpCommand)
export class CreateUserWithOtpHandler
  implements ICommandHandler<CreateUserWithOtpCommand>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserWithOtpCommand): Promise<UserModel> {
    const { phone } = command;
    return this.userRepository.createWithOtp(phone);
  }
}
