import { PermissionType } from '@/common/permissions/permission-type';

export class CommissionPermission {
  static readonly CREATE_COMMISSION: PermissionType = {
    name: 'createCommission',
    title: 'ایجاد کارمزد',
  };

  static readonly UPDATE_COMMISSION: PermissionType = {
    name: 'updateCommission',
    title: 'آپدیت کارمزد',
  };

  static readonly DELETE_COMMISSION: PermissionType = {
    name: 'deleteCommission',
    title: 'حذف کارمزد',
  };

  static readonly BULK_DELETE_COMMISSION: PermissionType = {
    name: 'bulkDeleteCommission',
    title: 'حذف چندتایی کارمزد',
  };
}
