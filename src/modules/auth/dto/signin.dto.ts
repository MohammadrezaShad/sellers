import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType()
export class SigninInput extends PickType(UserEntity, ['phone']) {
  @Field(() => String)
  password: string;
}

@InputType()
export class SendSigninSmsInput extends PickType(UserEntity, ['phone']) {}

@InputType()
export class SendSigninWitOtpInput extends PickType(UserEntity, ['phone']) {
  @Field(() => String)
  code?: string;
}

export class SigninWitOtpInput extends PickType(UserEntity, ['phone']) {
  @Field(() => String)
  code?: string;
}

@ObjectType()
export class SigninOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;
}
