import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

import { Schema } from '@/common/decorators/schema.decorator';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { IsString } from 'class-validator';
import { SellerEntity } from '@/modules/seller/entity/seller.entity';

@InputType('ReportInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.REPORT })
export class ReportEntity extends DefaultEntity {
  @Field(() => SellerEntity)
  @Prop({ type: String })
  @IsString()
  seller: string;

  @Field(() => String, { nullable: true })
  @Prop(() => String)
  @IsString()
  description?: string;

  @Field(() => String, { nullable: true })
  @Prop(() => String)
  @IsString()
  commission?: string;

  @Field(() => String, { nullable: true })
  @Prop(() => String)
  @IsString()
  netAmountAfterTaxDeduction?: string;
}

type TReportEntity = Document<ReportEntity>;
const ReportEntitySchema = SchemaFactory(ReportEntity);

ReportEntitySchema.index({ name: 'text', title: 'text' });
ReportEntitySchema.index({ name: 1, title: 1 });

export { ReportEntitySchema, TReportEntity };
