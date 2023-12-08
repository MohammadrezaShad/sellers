import { Injectable, OnModuleInit } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';

import { Permission } from './common/permissions/permission-type';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async onModuleInit() {
    // Promise.all(
    //   Object.keys(Permission).map(async key => {
    //     const dbPermission = await this.permissionRepository.findByName(
    //       Permission[key].name,
    //     );
    //     if (!dbPermission) {
    //       await this.permissionRepository.directCreate({
    //         _id: new ObjectId(),
    //         name: Permission[key].name,
    //         title: Permission[key].title,
    //       });
    //     }
    //   }),
    // );
    //

    for (const key of Object.keys(Permission)) {
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
    }

    const allPermission = await this.permissionRepository.findAll();
    const permissionIds =
      allPermission?.map(({ _id }) => _id.toHexString()) || [];

    const dbRole = await this.roleRepository.findByName('CEO');

    if (!dbRole) {
      this.roleRepository.directCreate({
        _id: new ObjectId(),
        name: 'CEO',
        title: 'مدیر ارشد',
        permissions: permissionIds,
      });
    }
  }
}
