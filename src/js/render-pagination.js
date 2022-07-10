import { PaginApi } from './pagination-api';
import { refs } from './refs';
import { pagiListeners } from './pagination';
import ApiRequest from './genre-trand-request';
const paginationApi = new PaginApi();
import ApiRequest from './genre-trand-request';

const apiRequest = new ApiRequest();

export function renderPagination(total, placeToAppend, query) {
  paginationApi.append(total, placeToAppend);
  pagiListeners(query);

  if (paginationApi.refs.changingBtns.length < 6) {
    paginationApi.refs.btnPrev.classList.add('visually-hidden');
    paginationApi.refs.firstBtn.classList.add('visually-hidden');
    paginationApi.refs.lastBtn.classList.add('visually-hidden');
    paginationApi.refs.btnNext.classList.add('visually-hidden');
  }

  // console.log(paginationApi.refs.changingBtns.length);

  //   console.log(paginationApi.refs.lastBtn);
  // console.log(
  //   paginationApi.refs.changingBtns[paginationApi.refs.changingBtns.length - 1]
  // );

  //btnPrev firstBtn lastBtn btnNext
}
