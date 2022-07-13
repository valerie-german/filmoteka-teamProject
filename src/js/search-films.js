import { MarkupApi } from './markup-api';
import ApiRequest from './genre-trand-request';
import { refs } from './refs';
import { PaginApi } from './pagination-api';
import { renderPagination } from './render-pagination';

import { showPreloader, hidePreloader } from './preloader';

const paginationApi = new PaginApi();
const markupApi = new MarkupApi();
const apiRequest = new ApiRequest();

export function searchFilms() {
  refs.form.addEventListener('submit', onSearch);

  async function onSearch(e) {
    e.preventDefault();
    showPreloader();

    const form = e.currentTarget;

    const data = await apiRequest.searchFilms(
      apiRequest.page,
      form.elements.searchQuery.value
    );
    console.log(apiRequest.totalPages);

    if (refs.input.value === '' || data.length === 0) {
      hidePreloader();
      refs.input.value = '';
      return refs.notification.classList.remove('notify-is-hidden');
    } else if (apiRequest.totalPages === 1) {
      await renderSearchMarkup();
    } else {
      await renderSearchMarkup();
      renderPagination(
        apiRequest.totalPages,
        refs.pagination,
        form.elements.searchQuery.value
      );
    }

    async function renderSearchMarkup() {
      hidePreloader();
      refs.notification.classList.add('notify-is-hidden');
      markupApi.deleteMarkup();
      paginationApi.deleteMarkup();
      markupApi.renderMarkUp(data);
      paginationApi.query = await form.elements.searchQuery.value;
    }
  }
}
