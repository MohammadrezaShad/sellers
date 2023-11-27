import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchRoleResults } from '@/modules/auth/components/role/dto/search-role.dto';
import { SearchRoleQuery } from '@/modules/auth/components/role/query/search-role/search-role.query';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';

@QueryHandler(SearchRoleQuery)
export class SearchRoleHanler implements IQueryHandler<SearchRoleQuery> {
  constructor(private readonly roleRepository: RoleRepository) {}
  async execute({
    searchRoleInput,
  }: SearchRoleQuery): Promise<SearchRoleResults> {
    const result = this.roleRepository.search(searchRoleInput);
    return result;
  }
}
