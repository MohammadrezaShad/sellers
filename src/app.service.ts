import { Injectable, OnModuleInit } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import Permission from '@/common/permissions/permisison.type';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async onModuleInit() {
    Promise.all(
      Object.keys(Permission).map(async permissionName => {
        const dbPermission =
          await this.permissionRepository.findByName(permissionName);
        if (!dbPermission) {
          await this.permissionRepository.directCreate({
            _id: new ObjectId(),
            name: permissionName,
            title: Permission[permissionName],
          });
        }
      }),
    );
  }
}
