import { ImagePermission } from '@/modules/image/permission/image-permission';
import { UserPermission } from '@/modules/user/permission/user-permission';

export class PermissionType {
  name: string;
  title: string;
}

export class Permission {
  static readonly CREATE: PermissionType = { name: 'create', title: 'ایجاد' };
  static readonly UPDATE: PermissionType = { name: 'update', title: 'آپدیت' };
  static readonly DELETE: PermissionType = { name: 'delete', title: 'حذف' };
  static readonly READ: PermissionType = { name: 'read', title: 'خواندن' };
  static readonly BULK_DELETE: PermissionType = {
    name: 'bulkDelete',
    title: 'حذف چندتایی',
  };

  static readonly CREATE_USER = UserPermission.CREATE_USER;
  static readonly UPDATE_USER = UserPermission.UPDATE_USER;
  static readonly DELETE_USER = UserPermission.DELETE_USER;

  static readonly UPLOAD_IMAGE = ImagePermission.UPLOAD_IMAGE;
}
