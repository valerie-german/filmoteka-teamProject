import { PaginApi } from './pagination-api';
import { refs } from './refs';
import { pagiListeners } from './pagination';
import ApiRequest from './genre-trand-request';
const paginationApi = new PaginApi();
import ApiRequest from './genre-trand-request';

const apiRequest = new ApiRequest();

export function renderPagination(total, placeToAppend) {
  paginationApi.append(total, placeToAppend);
  pagiListeners();

  console.log(paginationApi.query);
  //   console.log(paginationApi.refs);
}
