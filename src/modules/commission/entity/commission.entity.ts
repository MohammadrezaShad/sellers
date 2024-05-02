import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

import { Schema } from '@/common/decorators/schema.decorator';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { IsOptional, IsString } from 'class-validator';
import { SellerEntity } from '@/modules/seller/entity/seller.entity';

@InputType('CommissionInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.COMMISSION })
export class CommissionEntity extends DefaultEntity {
  @Field(() => SellerEntity)
  @Prop({ type: String })
  @IsString()
  seller: string;

  @Field(() => String, { nullable: true })
  @Prop(() => String)
  @IsOptional()
  @IsString()
  percent?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  @IsOptional()
  @IsString()
  lifeInsurancePremium?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  @IsOptional()
  @IsString()
  additionalInsurancePremium?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  @IsOptional()
  @IsString()
  insurancePremium?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  @IsOptional()
  @IsString()
  lifeInsuranceCommission?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  @IsOptional()
  @IsString()
  additionalInsuranceCommission?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  @IsOptional()
  @IsString()
  totalCommission?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  @IsOptional()
  @IsString()
  debt?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  @IsOptional()
  @IsString()
  totalCommssionAfterDeductingDebt?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  @IsOptional()
  @IsString()
  depositTaminEjtemaei?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  @IsOptional()
  @IsString()
  totalCommssionAfterDeductingDebtAndDepositTaminEjtemaei?: string;

  @Field(() => String, { nullable: true })
  @Prop(() => String)
  @IsOptional()
  @IsString()
  date?: string;
}

type TCommissionEntity = Document<CommissionEntity>;
const CommissionEntitySchema = SchemaFactory(CommissionEntity);

CommissionEntitySchema.index({ date: 'text' });
CommissionEntitySchema.index({ date: 1 });

export { CommissionEntitySchema, TCommissionEntity };
