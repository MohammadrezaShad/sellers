import { PermissionType } from '@/common/permissions/permission-type';

export class UserPermission {
  static readonly CREATE_USER: PermissionType = {
    name: 'createUser',
    title: 'ایجاد کاربر',
  };

  static readonly UPDATE_USER: PermissionType = {
    name: 'updateUser',
    title: 'آپدیت کاربر',
  };

  static readonly DELETE_USER: PermissionType = {
    name: 'deleteUser',
    title: 'حذف کاربر',
  };
}
