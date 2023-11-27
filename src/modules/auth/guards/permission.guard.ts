import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql/dist/services/gql-execution-context';

import Permission from '@/common/permissions/permisison.type';
import { FindPermissionByIdsUseCase } from '@/modules/auth/components/permission/use-case/find-permission-by-ids.use-case';
import { FindRoleByIdsUseCase } from '@/modules/auth/components/role/use-case/find-role-by-ids.use-case';
import { PERMISSION_KEY } from '@/modules/auth/constants/common.constant';
import { ACCESS_ERROR_MESSAGE } from '@/modules/auth/constants/error-message.constant';
import { FindUserByIdUseCase } from '@/modules/user/use-case/find-user-by-id.use-case';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userUseCase: FindUserByIdUseCase,
    private readonly permissionUseCase: FindPermissionByIdsUseCase,
    private readonly roleUseCase: FindRoleByIdsUseCase,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(ctx);

    const permissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!permissions) {
      return true;
    }

    const { user: payload } = context.getContext().req;
    if (!payload) return false;

    // get user object from payload
    const user = await this.userUseCase.findUserByid({ id: payload._id });

    // get user permissions from user
    const userPermissions = await this.permissionUseCase.findPermissionByids({
      ids: user.result.permissions,
    });

    // get user roles from user
    const userRoles = await this.roleUseCase.findRoleByids({
      ids: user.result.roles,
    });

    // get role permission ids from role

    const rolePermissionIds: string[] = [];

    userRoles.results.map(role => {
      role.permissions.map(permission => {
        rolePermissionIds.push(permission);
      });
    });

    // get role permission with permission ids
    const rolePermission = await this.permissionUseCase.findPermissionByids({
      ids: rolePermissionIds,
    });

    // merge user permission and role permission
    const allPermisisons = userPermissions.results.concat(
      rolePermission.results,
    );

    // get permisison title list from all permissions
    const permissionTitles = allPermisisons?.map(({ title }) => title) || [];

    // check this user have permission or not
    const hasPermission = permissions.some(
      permission => permissionTitles?.includes(permission),
    );
    if (!hasPermission) {
      throw new ForbiddenException(ACCESS_ERROR_MESSAGE);
    }
    return true;
  }
}
