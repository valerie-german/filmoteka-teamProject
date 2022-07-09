import { PaginApi } from './pagination-api';
import { refs } from './refs';
import { pagiListeners } from './pagination';
const paginationApi = new PaginApi();

export function renderPagination(total, placeToAppend) {
  paginationApi.append(total, placeToAppend);
  pagiListeners();

  //   console.log(paginationApi.refs);
}
