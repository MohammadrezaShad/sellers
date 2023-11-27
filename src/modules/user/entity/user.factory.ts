import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserModel } from '@/modules/user/model/user.model';

@Injectable()
export class UserEntityFactory
  implements ModelEntityFactory<UserEntity, UserModel>
{
  create(user: UserModel): UserEntity | null {
    if (!user) return null;
    return {
      _id: new ObjectId(user.getId()),
      email: user.getEmail(),
      password: user.getPassword(),
      isVerified: user.getIsVerified(),
      displayName: user.getDisplayName(),
      refreshToken: user.getRefreshTokens(),
      permissions: user.getPermissions(),
      roles: user.getRoles(),
    };
  }

  createFromEntity(userEntity: UserEntity): UserModel | null {
    if (!userEntity) return null;
    const {
      _id,
      displayName,
      email,
      password,
      isVerified,
      refreshToken,
      permissions,
      roles,
    } = userEntity;
    return new UserModel(
      _id.toHexString(),
      displayName,
      email,
      isVerified,
      password,
      refreshToken,
      permissions,
      roles,
    );
  }
}
