import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { OtpEntity } from '../entity/otp.entity';

@InputType()
export class FindOtpByIdInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class FindOtpByPhoneInput {
  @Field(() => String)
  phone: string;
}

@ObjectType()
export class FindOtpOutput extends CoreOutput {
  @Field(() => OtpEntity, { nullable: true })
  result?: OtpEntity;
}
