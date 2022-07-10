import { MarkupApi } from './markup-api';
import ApiRequest from './genre-trand-request';
import { refs } from './refs';
import { PaginApi } from './pagination-api';
import { renderPagination } from './render-pagination';
const paginationApi = new PaginApi();
const markupApi = new MarkupApi();
const apiRequest = new ApiRequest();

export function searchFilms() {
  refs.form.addEventListener('submit', onSearch);

  async function onSearch(e) {
    e.preventDefault();
    markupApi.deleteMarkup();
    paginationApi.deleteMarkup();

    const form = e.currentTarget;
    refs.preloader.classList.add('hide-preloader');
    const data = await apiRequest.searchFilms(
      apiRequest.page,
      form.elements.searchQuery.value
    );
    
    markupApi.renderMarkUp(data);
    paginationApi.query = await form.elements.searchQuery.value;
    refs.preloader.classList.add('preloader-hiden');
    renderPagination(
      apiRequest.totalPages,
      refs.pagination,
      form.elements.searchQuery.value
    );
  }
}
