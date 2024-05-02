import { FindCommissionByIdHanler } from './find-commission-by-id/find-commission-by-id.handler';
import { FindCommissionByIdsHanler } from './find-commission-by-ids/find-commission-by-ids.handler';
import { SearchCommissionHanler } from './search-commission/search-commission.handler';

export const CommissionQueryHandlers = [
  SearchCommissionHanler,
  FindCommissionByIdHanler,
  FindCommissionByIdsHanler,
];
