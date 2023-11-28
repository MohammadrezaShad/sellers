import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

import { Schema } from '@/common/decorators/schema.decorator';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { IsNumber, IsString } from 'class-validator';

@InputType('OtpInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.OTP })
export class OtpEntity extends DefaultEntity {
  @Field(() => String)
  @Prop()
  @IsString()
  phone: string;

  @Field(() => Number)
  @Prop()
  @IsNumber()
  code: number;
}

export type TOtpEntity = Document<OtpEntity>;
export const OtpEntitySchema = SchemaFactory(OtpEntity);
