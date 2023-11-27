import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  SearchRoleInput,
  SearchRoleOutput,
  SearchRoleResults,
} from '@/modules/auth/components/role/dto/search-role.dto';
import { RoleEntityFactory } from '@/modules/auth/components/role/entity/role.factory';
import { SearchRoleQuery } from '@/modules/auth/components/role/query/search-role/search-role.query';

@Injectable()
export class SearchRoleUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly roleFactory: RoleEntityFactory,
  ) {}

  async search(searchRoleInput: SearchRoleInput): Promise<SearchRoleOutput> {
    try {
      const { results, success, totalCount, totalPages }: SearchRoleResults =
        await this.queryBus.execute(new SearchRoleQuery(searchRoleInput));

      const resultList = results.map(model => this.roleFactory.create(model));

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
