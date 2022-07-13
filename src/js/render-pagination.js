import { PaginApi } from './pagination-api';
import { pagiListeners } from './pagination';
const paginationApi = new PaginApi();

export function renderPagination(total, placeToAppend, query) {
  paginationApi.append(total, placeToAppend);
  pagiListeners(query);

  if (paginationApi.refs.changingBtns.length < 6) {
    paginationApi.refs.btnPrev.classList.add('visually-hidden');
    paginationApi.refs.firstBtn.classList.add('visually-hidden');
    paginationApi.refs.lastBtn.classList.add('visually-hidden');
    paginationApi.refs.btnNext.classList.add('visually-hidden');
  }
}
