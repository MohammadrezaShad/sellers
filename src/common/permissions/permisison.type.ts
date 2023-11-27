import { CommonPermission } from '@/common/permissions/common-permission.enum';
import { TaxonomyPermission } from '@/modules/taxonomy/enum/taxonomy-permission.enum';
import { UserPermission } from '@/modules/user/enum/user-permissions.enum';

const Permission = {
  ...CommonPermission,
  ...UserPermission,
  ...TaxonomyPermission,
};

type Permission = CommonPermission | UserPermission | TaxonomyPermission;

export default Permission;
