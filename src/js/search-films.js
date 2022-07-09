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
    markupApi.deleteMarkup();
    paginationApi.deleteMarkup();
    markupApi.isMainPage = true;
    e.preventDefault();

    const form = e.currentTarget;

    const data = await apiRequest.searchFilms(
      apiRequest.page,
      form.elements.searchQuery.value
    );
    markupApi.renderMarkUp(data);
    paginationApi.query = await form.elements.searchQuery.value;

    renderPagination(apiRequest.totalPages, refs.pagination);
  }
}
