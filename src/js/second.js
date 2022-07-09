import ApiRequest from './genre-trand-request';
import { MarkupApi } from './markup-api';
// import { modal } from './modal';
import { renderPagination } from './render-pagination';
import { refs } from './refs';
import { getFilmId } from './getFilmId';

const apiRequest = new ApiRequest();
const markupApi = new MarkupApi();

// export async function createMarkup() {
//   const filmData = await apiRequest.getTranding(apiRequest.page);
//   const genresData = await apiRequest.getGenre();

//   markupApi.append(filmData, genresData);
//   getFilmId();
//   //   modal();
//   renderPagination(apiRequest.totalPages, refs.pagination);
// }

export async function second() {
  const data = await apiRequest.getTranding(apiRequest.page);

  markupApi.renderMarkUp(data);
  getFilmId();
  renderPagination(apiRequest.totalPages, refs.pagination);
}
