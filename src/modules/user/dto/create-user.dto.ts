import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsOptional, Matches } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class CreateUserInput extends PickType(UserEntity, [
  'email',
  'phone',
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
  @IsObjectId({ each: true })
  @IsOptional()
  permissions?: string[];

  @Field(() => [String], { nullable: true })
  @IsObjectId({ each: true })
  @IsOptional()
  roles?: string[];
}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
