import { SetMetadata } from '@nestjs/common';

import Permission from '@/common/permissions/permisison.type';
import { PERMISSION_KEY } from '@/modules/auth/constants/common.constant';

export const Permissions = (...permission: Permission[]) =>
  SetMetadata(PERMISSION_KEY, permission);
