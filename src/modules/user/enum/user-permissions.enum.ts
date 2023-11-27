import { registerEnumType } from '@nestjs/graphql';
export enum UserPermission {
  CREATE_USER = 'create_user',
  UPDATE_USER = 'update_user',
  DELETE_USER = 'delete_user',
}

registerEnumType(UserPermission, {
  name: 'UserPermission',
});
