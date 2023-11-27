import { registerEnumType } from '@nestjs/graphql';

export enum CommonPermission {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  BULK_DELETE = 'bulk_delete',
}
registerEnumType(CommonPermission, {
  name: 'CommonPermission',
});
