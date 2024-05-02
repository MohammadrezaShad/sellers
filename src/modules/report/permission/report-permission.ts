import { PermissionType } from '@/common/permissions/permission-type';

export class ReportPermission {
  static readonly CREATE_REPORT: PermissionType = {
    name: 'createReport',
    title: 'ایجاد گذارش',
  };

  static readonly UPDATE_REPORT: PermissionType = {
    name: 'updateReport',
    title: 'آپدیت گذارش',
  };

  static readonly DELETE_REPORT: PermissionType = {
    name: 'deleteReport',
    title: 'حذف گذارش',
  };

  static readonly BULK_DELETE_REPORT: PermissionType = {
    name: 'bulkDeleteReport',
    title: 'حذف چندتایی گذارش',
  };
}
