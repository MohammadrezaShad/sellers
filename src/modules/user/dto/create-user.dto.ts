import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Matches } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType()
export class CreateUserInput extends PickType(UserEntity, [
  'email',
  'displayName',
  'isVerified',
  'refreshToken',
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

  @Field(() => [String], { nullable: true })
  permissions?: string[];

  @Field(() => [String], { nullable: true })
  roles?: string[];
}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
