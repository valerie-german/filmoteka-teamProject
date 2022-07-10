import ApiRequest from './genre-trand-request';
import { MarkupApi } from './markup-api';
// import { modal } from './modal';
import { renderPagination } from './render-pagination';
import { refs } from './refs';
import { getFilmId } from './getFilmId';
import { searchFilms } from './search-films';
import { PaginApi } from './pagination-api';

const apiRequest = new ApiRequest();
const markupApi = new MarkupApi();
const paginationApi = new PaginApi();
// export async function createMarkup() {
//   const filmData = await apiRequest.getTranding(apiRequest.page);
//   const genresData = await apiRequest.getGenre();
//   markupApi.append(filmData, genresData);
//   getFilmId();
//   //   modal();
//   renderPagination(apiRequest.totalPages, refs.pagination);
// }

export async function defaultGalleyRender() {
  refs.preloader.classList.add('hide-preloader');
  const data = await apiRequest.getTranding(apiRequest.page);
  // searchFilms();
  markupApi.renderMarkUp(data);
  refs.preloader.classList.add('preloader-hiden');
  getFilmId();
  renderPagination(apiRequest.totalPages, refs.pagination);

  searchFilms();

  // refs.form.addEventListener('submit', onSearch);

  // async function onSearch(e) {
  //   e.preventDefault();
  //   markupApi.deleteMarkup();
  //   paginationApi.deleteMarkup();

  //   const form = e.currentTarget;

  //   const data = await apiRequest.searchFilms(
  //     apiRequest.page,
  //     form.elements.searchQuery.value
  //   );
  //   markupApi.renderMarkUp(data);
  //   paginationApi.query = await form.elements.searchQuery.value;

  //   renderPagination(
  //     apiRequest.totalPages,
  //     refs.pagination,
  //     form.elements.searchQuery.value
  //   );
  // }
}
