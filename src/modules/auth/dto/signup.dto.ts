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

@ObjectType()
export class SignupOutput extends CoreOutput {}
