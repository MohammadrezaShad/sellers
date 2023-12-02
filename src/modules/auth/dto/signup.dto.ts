import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Matches } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType()
export class SignupInput extends PickType(UserEntity, [
  'email',
  'displayName',
  'phone',
] as const) {
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
export class SignupWithOtpInput extends PickType(UserEntity, ['phone']) {
  @Field(() => Number)
  code: number;
}

@ObjectType()
export class SignupOutput extends CoreOutput {}

@ObjectType()
export class SignupWithOtpOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;
}
