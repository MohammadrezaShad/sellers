import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

import {
  PaginationInput,
  PaginationOutput,
} from '@/common/dtos/pagination.dto';
import { SellerEntity } from '../entity/seller.entity';

@InputType('SearchSellerInput')
export class SearchSellerInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  text?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  nationalNumber?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  bankAccountNumber?: string;
}

@ObjectType('SearchSellerOutput')
export class SearchSellerOutput extends PaginationOutput {
  @Field(() => [SellerEntity], { nullable: true })
  results?: SellerEntity[];
}
