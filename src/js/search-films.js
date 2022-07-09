import { MarkupApi } from './markup-api';
import ApiRequest from './genre-trand-request';
import { refs } from './refs';
import { PaginApi } from './pagination-api';
const paginationApi = new PaginApi();
const markupApi = new MarkupApi();
const apiRequest = new ApiRequest();

export function searchFilms() {
  refs.form.addEventListener('submit', onSearch);

  async function onSearch(e) {
    markupApi.deleteMarkup();
    markupApi.isMainPage = true;
    e.preventDefault();

    const form = e.currentTarget;

    const data = await apiRequest.searchFilms(
      form.elements.searchQuery.value,
      apiRequest.page
    );
    markupApi.renderMarkUp(data);
    paginationApi.deleteMarkup();
  }
}
