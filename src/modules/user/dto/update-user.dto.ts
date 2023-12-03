import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { CoreOutput } from '@/common/dtos/output.dto';
import { CreateUserInput } from '@/modules/user/dto/create-user.dto';
import { Matches } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  @IsObjectId()
  userId: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  @IsObjectId()
  userId: string;

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
export class SetPasswordInput {
  @Field(() => String)
  phone: string;

  @Field(() => Number)
  verificationCode: number;

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
export class UpdateUserOutput extends CoreOutput {}
