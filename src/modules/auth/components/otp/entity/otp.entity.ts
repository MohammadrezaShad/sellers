import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { Schema } from '@/common/decorators/schema.decorator';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { IsString } from 'class-validator';

@InputType('OtpInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.OTP })
export class OtpEntity extends DefaultEntity {
  @Field(() => String)
  @Prop()
  @IsString()
  phone: string;

  @Field(() => String)
  @Prop()
  @IsString()
  code: string;
}

export type TOtpEntity = Document<OtpEntity>;
export const OtpEntitySchema = SchemaFactory(OtpEntity);

// OtpEntitySchema.pre('save', async function (next) {
//   const otp = this as TOtpEntity;
//   if (!otp.code) {
//     next();
//     return;
//   }
//   if (!otp.isModified('code')) return next();
//   try {
//     otp.code = await bcrypt.hash(otp.code, 10);
//     return next();
//   } catch (e) {
//     return next(e as any);
//   }
// });

// OtpEntitySchema.methods.validateCode = async function validateCode(
//   data: string,
// ) {
//   return bcrypt.compare(data, this.code);
// };
