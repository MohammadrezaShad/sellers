import { FindUserByEmailHandler } from '@/modules/user/query/find-by-email/find-user-by-email.handler';
import { FindUsersByRoleHandler } from '@/modules/user/query/find-by-role/find-users-by-role.handler';
import { FindUserbyIdHandler } from '@/modules/user/query/find-user-by-id/find-user-by-id.handler';
import { SearchUserHanler } from '@/modules/user/query/search-user/search-user.handler';

export const QueryHandlers = [
  FindUserbyIdHandler,
  FindUserByEmailHandler,
  FindUsersByRoleHandler,
  SearchUserHanler,
];
