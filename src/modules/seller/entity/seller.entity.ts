import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

import { Schema } from '@/common/decorators/schema.decorator';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { IsOptional, IsString } from 'class-validator';

@InputType('SellerInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.SELLER })
export class SellerEntity extends DefaultEntity {
  @Field(() => String, { nullable: true })
  @Prop(() => String)
  @IsString()
  name?: string;

  @Field(() => String, { nullable: true })
  @Prop(() => String)
  @IsString()
  marketerCode?: string;

  @Field(() => String, { nullable: true })
  @Prop({
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  nationalNumber?: string;

  @Field(() => String, { nullable: true })
  @Prop({
    type: String,
    nullable: true,
    unique: true,
    sparse: true,
  })
  @IsOptional()
  @IsString()
  bankAccountNumber?: string;
}

type TSellerEntity = Document<SellerEntity>;
const SellerEntitySchema = SchemaFactory(SellerEntity);

SellerEntitySchema.index({ name: 'text', title: 'text' });
SellerEntitySchema.index({ name: 1, title: 1 });

export { SellerEntitySchema, TSellerEntity };
