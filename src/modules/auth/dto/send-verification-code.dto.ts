import { UserEntity } from '@/modules/user/entity/user.entity';
import { InputType, PickType } from '@nestjs/graphql';

@InputType()
export class SendVerificationCodeInput extends PickType(UserEntity, [
  'phone',
]) {}
