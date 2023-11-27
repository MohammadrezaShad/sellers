import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  SearchPermissionInput,
  SearchPermissionOutput,
  SearchPermissionResults,
} from '@/modules/auth/components/permission/dto/search-permission.dto';
import { PermissionEntityFactory } from '@/modules/auth/components/permission/entity/permission.factory';
import { SearchPermissionQuery } from '@/modules/auth/components/permission/query/search-permission/search-permission.query';

@Injectable()
export class SearchPermissionUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly permissionFactory: PermissionEntityFactory,
  ) {}

  async search(
    searchPermissionInput: SearchPermissionInput,
  ): Promise<SearchPermissionOutput> {
    try {
      const {
        results,
        success,
        totalCount,
        totalPages,
      }: SearchPermissionResults = await this.queryBus.execute(
        new SearchPermissionQuery(searchPermissionInput),
      );

      const resultList = results.map(model =>
        this.permissionFactory.create(model),
      );
      return {
        success,
        results: resultList,
        totalCount,
        totalPages,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
