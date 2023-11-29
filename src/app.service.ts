import { Injectable, OnModuleInit } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';
import { Permission } from './common/permissions/permission-type';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async onModuleInit() {
    Promise.all(
      Object.keys(Permission).map(async key => {
        const dbPermission = await this.permissionRepository.findByName(
          Permission[key].name,
        );
        if (!dbPermission) {
          await this.permissionRepository.directCreate({
            _id: new ObjectId(),
            name: Permission[key].name,
            title: Permission[key].title,
          });
        }
      }),
    );
  }
}
