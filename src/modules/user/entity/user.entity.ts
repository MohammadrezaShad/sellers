import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { IsOptional, IsString, Matches } from 'class-validator';
import { CallbackError } from 'mongoose';

import { Schema } from '@/common/decorators/schema.decorator';
import { DefaultEntity } from '@/common/entities/default.entity';
import { CollectionName } from '@/common/enums/collection-name.enum';
import { type Document } from '@/common/types/document.type';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { PermissionEntity } from '@/modules/auth/components/permission/entity/permission.entity';
import { RoleEntity } from '@/modules/auth/components/role/entity/role.entity';

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.USER })
export class UserEntity extends DefaultEntity {
  @Field(() => String, { nullable: true })
  @Prop()
  @IsOptional()
  displayName?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  @IsOptional()
  email?: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  @Field(() => String)
  phone: string;

  @Field(() => [RoleEntity], { nullable: true })
  @Prop({ type: [String] })
  @IsString({ each: true })
  @IsOptional()
  roles?: string[];

  @Field(() => [PermissionEntity], { nullable: true })
  @Prop({ type: [String] })
  @IsString({ each: true })
  @IsOptional()
  permissions?: string[];

  @Prop({
    type: String,
    required: false,
    select: false,
  })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
    {
      message:
        'رمز عبور باید حداقل 8 کاراکتر داشته باشد، حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص داشته باشد',
    },
  )
  @IsOptional()
  password?: string;

  @Prop({
    type: Boolean,
    default: false,
    nullable: true,
  })
  @Field(() => Boolean, { nullable: true })
  isVerified?: boolean;

  @Prop({ type: [String], nullable: true })
  refreshToken?: string[];

  // validatePassword?: (password: string) => Promise<boolean>;
}

type TUser = Document<UserEntity>;
const UserSchema = SchemaFactory(UserEntity);

UserSchema.index({ displayName: 'text' });
UserSchema.index({ displayName: 1 });

export { UserSchema, TUser };

UserSchema.pre('save', async function (next) {
  const user = this as TUser;
  if (!user.password) {
    next();
    return;
  }
  if (!user.isModified('password')) return next();
  try {
    user.password = await bcrypt.hash(user.password, 10);
    return next();
  } catch (e) {
    return next(e as CallbackError);
  }
});
