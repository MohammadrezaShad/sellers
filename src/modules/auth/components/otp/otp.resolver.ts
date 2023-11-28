import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { CreateOtpInput, CreateOtpOutput } from './dto/create-otp.dto';
import { DeleteOtpInput, DeleteOtpOutput } from './dto/delete-otp.dto';
import { OtpMutation } from './dto/otp.dto';
import { CreateOtpUseCase } from './use-case/create-otp.use-case';
import { DeleteOtpUseCase } from './use-case/delete-otp.use-case';

@Resolver(() => OtpMutation)
export class OtpMutationResolver {
  constructor(
    private readonly createOtpUseCase: CreateOtpUseCase,
    private readonly deleteOtpUseCase: DeleteOtpUseCase,
  ) {}

  @ResolveField(() => CreateOtpOutput)
  async createOtp(
    @Args('input') input: CreateOtpInput,
  ): Promise<CreateOtpOutput> {
    return this.createOtpUseCase.createOtp(input);
  }

  @ResolveField(() => DeleteOtpOutput)
  async deleteOtp(
    @Args('input') input: DeleteOtpInput,
  ): Promise<DeleteOtpOutput> {
    return this.deleteOtpUseCase.deleteOtp(input);
  }
}

export const OtpResolvers = [OtpMutationResolver];
