import ApiRequest from './genre-trand-request';
import { MarkupApi } from './markup-api';

import { renderPagination } from './render-pagination';
import { refs } from './refs';
import { getFilmId } from './getFilmId';
import { searchFilms } from './search-films';

const apiRequest = new ApiRequest();
const markupApi = new MarkupApi();

export async function defaultGalleyRender() {
  const data = await apiRequest.getTranding(apiRequest.page);

  await markupApi.renderMarkUp(data);

  getFilmId();
  renderPagination(apiRequest.totalPages, refs.pagination);

  searchFilms();
}
