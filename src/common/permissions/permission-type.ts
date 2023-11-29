export class PermissionType {
  name: string;
  title: string;
}

export class Permission {
  static readonly CREATE: PermissionType = { name: 'create', title: 'ایجاد' };
  static readonly UPDATE: PermissionType = { name: 'update', title: 'آپدیت' };
  static readonly DELETE: PermissionType = { name: 'delete', title: 'حذف' };
  static readonly READ: PermissionType = { name: 'read', title: 'خواندن' };
  static readonly UPLOAD_IMAGE: PermissionType = {
    name: 'uploadImage',
    title: 'آپلود عکس',
  };
  static readonly BULK_DELETE: PermissionType = {
    name: 'bulkDelete',
    title: 'حذف چندتایی',
  };
}
