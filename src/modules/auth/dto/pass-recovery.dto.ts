import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class PassRecoveryWithPhoneInput extends PickType(UserEntity, [
  'phone',
]) {
  @Field(() => Number)
  code: number;
}

@InputType()
export class PassRecoveryWithEmailInput extends PickType(UserEntity, [
  'email',
]) {
  @Field(() => Number)
  code: number;
}

@ObjectType()
export class PassRecoveryOutput extends CoreOutput {}
