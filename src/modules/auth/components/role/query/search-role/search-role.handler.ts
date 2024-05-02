import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchRoleQuery } from '@/modules/auth/components/role/query/search-role/search-role.query';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';
import { SearchRoleOutput } from '../../dto/search-role.dto';

@QueryHandler(SearchRoleQuery)
export class SearchRoleHanler implements IQueryHandler<SearchRoleQuery> {
  constructor(private readonly roleRepository: RoleRepository) {}
  async execute({
    searchRoleInput,
  }: SearchRoleQuery): Promise<SearchRoleOutput> {
    const result = await this.roleRepository.search(searchRoleInput);
    return result;
  }
}
