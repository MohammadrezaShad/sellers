import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType()
export class SigninInput extends PickType(UserEntity, ['email']) {
  @Field(() => String)
  password: string;
}

@ObjectType()
export class SigninOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;
}
