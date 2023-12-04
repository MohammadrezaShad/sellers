import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Matches } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType()
export class PassRecoveryWithPhoneInput extends PickType(UserEntity, [
  'phone',
]) {
  @Field(() => String)
  phone: string;

  @Field(() => Number)
  code: number;

  @Field(() => String)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
    {
      message:
        'رمز عبور باید حداقل 8 کاراکتر داشته باشد، حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص داشته باشد',
    },
  )
  password: string;
}

@InputType()
export class PassRecoveryWithEmailInput extends PickType(UserEntity, [
  'email',
]) {
  @Field(() => Number)
  code: number;
}

@InputType()
export class SendPassRecoverySmsInput extends PickType(UserEntity, ['phone']) {}

@ObjectType()
export class PassRecoveryOutput extends CoreOutput {}

@InputType()
export class ValidateVerificationCodeInput extends PickType(UserEntity, [
  'phone',
]) {
  @Field(() => Number)
  code: number;
}
