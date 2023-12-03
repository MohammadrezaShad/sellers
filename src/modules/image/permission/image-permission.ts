import { PermissionType } from '@/common/permissions/permission-type';

export class ImagePermission {
  static readonly UPLOAD_IMAGE: PermissionType = {
    name: 'uploadImage',
    title: 'آپلود عکس',
  };

  static readonly UPDATE_IMAGE: PermissionType = {
    name: 'updateImage',
    title: 'آپدیت عکس',
  };

  static readonly DELETE_IMAGE: PermissionType = {
    name: 'deleteImage',
    title: 'حذف عکس',
  };
}
