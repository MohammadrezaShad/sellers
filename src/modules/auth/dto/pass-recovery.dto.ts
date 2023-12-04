import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Matches } from 'class-validator';

import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType()
export class SetPasswordInput {
  @Field(() => String)
  phone: string;

  @Field(() => String)
  verificationCode: string;

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
export class ValidateVerificationCodeInput extends PickType(UserEntity, [
  'phone',
]) {
  @Field(() => String)
  code: string;
}
