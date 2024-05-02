import { PermissionPermit } from '@/modules/auth/components/permission/permission/permission-permit';
import { RolePermission } from '@/modules/auth/components/role/permission/role-permission';
import { CommissionPermission } from '@/modules/commission/permission/comission-permission';
import { ImagePermission } from '@/modules/image/permission/image-permission';
import { ReportPermission } from '@/modules/report/permission/report-permission';
import { SellerPermission } from '@/modules/seller/permission/seller-permission';
import { TaxonomyPermission } from '@/modules/taxonomy/permission/taxonomy-permission';
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

  static readonly CREATE_PERMISSION = PermissionPermit.CREATE_PERMISSION;
  static readonly UPDATE_PERMISSION = PermissionPermit.UPDATE_PERMISSION;
  static readonly DELETE_PERMISSION = PermissionPermit.DELETE_PERMISSION;
  static readonly BULK_DELETE_PERMISSION =
    PermissionPermit.BULK_DELETE_PERMISSION;

  static readonly CREATE_ROLE = RolePermission.CREATE_ROLE;
  static readonly UPDATE_ROLE = RolePermission.UPDATE_ROLE;
  static readonly DELETE_ROLE = RolePermission.DELETE_ROLE;
  static readonly BULK_DELETE_ROLE = RolePermission.BULK_DELETE_ROLE;

  static readonly UPLOAD_IMAGE = ImagePermission.UPLOAD_IMAGE;
  static readonly UPDATE_IMAGE = ImagePermission.UPDATE_IMAGE;
  static readonly DELETE_IMAGE = ImagePermission.DELETE_IMAGE;

  static readonly CREATE_TAXONOMY = TaxonomyPermission.CREATE_TAXONOMY;
  static readonly UPDATE_TAXONOMY = TaxonomyPermission.UPDATE_TAXONOMY;
  static readonly DELETE_TAXONOMY = TaxonomyPermission.DELETE_TAXONOMY;

  static readonly CREATE_SELLER = SellerPermission.CREATE_SELLER;
  static readonly UPDATE_SELLER = SellerPermission.UPDATE_SELLER;
  static readonly DELETE_SELLER = SellerPermission.DELETE_SELLER;
  static readonly BULK_DELETE_SELLER = SellerPermission.BULK_DELETE_SELLER;

  static readonly CREATE_REPORT = ReportPermission.CREATE_REPORT;
  static readonly UPDATE_REPORT = ReportPermission.UPDATE_REPORT;
  static readonly DELETE_REPORT = ReportPermission.DELETE_REPORT;
  static readonly BULK_DELETE_REPORT = ReportPermission.BULK_DELETE_REPORT;

  static readonly CREATE_COMMISSION = CommissionPermission.CREATE_COMMISSION;
  static readonly UPDATE_COMMISSION = CommissionPermission.UPDATE_COMMISSION;
  static readonly DELETE_COMMISSION = CommissionPermission.DELETE_COMMISSION;
  static readonly BULK_DELETE_COMMISSION =
    CommissionPermission.BULK_DELETE_COMMISSION;
}
