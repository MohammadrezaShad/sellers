import { applyDecorators, UseGuards } from '@nestjs/common';

import Permission from '@/common/permissions/permisison.type';
import { Permissions } from '@/modules/auth/decorators/permission.decorator';
import { AccessTokenGuard } from '@/modules/auth/guards/access-token.guard';
import { PermissionGuard } from '@/modules/auth/guards/permission.guard';

type GuardDecorator = ClassDecorator | MethodDecorator;

export function PanelGuard<T extends GuardDecorator = ClassDecorator>(
  ...inputPermissions: Permission[]
): T {
  const permissions = inputPermissions?.length ? inputPermissions : [];
  return applyDecorators(
    Permissions(...permissions),
    UseGuards(AccessTokenGuard, PermissionGuard),
  ) as unknown as T;
}
