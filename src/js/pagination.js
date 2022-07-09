import { PaginApi } from './pagination-api';

import ApiRequest from './genre-trand-request';
import { MarkupApi } from './markup-api';

const paginationApi = new PaginApi();
const apiRequest = new ApiRequest();
const markupApi = new MarkupApi();

export function pagiListeners() {
  paginationApi.getRefs();

  const refs = {
    ...paginationApi.refs,
  };

  paginationApi.refs.paginationBtns.addEventListener('click', onPaginationBtns);

  function onPaginationBtns(event) {
    onStaticBtns(event);
    onFirstBtn(event);
    onLastBtn(event);
    onNextBtn(event);
    onPrevBtn(event);
  }

  async function onStaticBtns(event) {
    if (!event.target.classList.value.includes('btn__static')) {
      return;
    }

    // paginationApi.isLastPage = false;

    paginationApi.setCurrPage(event.target.textContent);
    // paginationApi.numberToRender = paginationApi._currentPage;

    paginationApi.deleteMarkup();

    markupApi.deleteMarkup();

    const data = await apiRequest.getTranding(paginationApi._currentPage);
    const dataGenres = await apiRequest.getGenre();
    markupApi.append(data, dataGenres);

    paginationApi.append(apiRequest.totalPages);
    paginationApi.getRefs();
  }

  async function onFirstBtn(event) {
    if (!event.target.classList.value.includes('first__btn')) {
      return;
    }
    paginationApi.isLastPage = false;

    paginationApi.numberToRender = 1;
    paginationApi.setCurrPage(event.target.textContent);

    paginationApi.deleteMarkup();

    markupApi.deleteMarkup();

    const data = await apiRequest.getTranding(paginationApi._currentPage);
    const dataGenres = await apiRequest.getGenre();
    markupApi.append(data, dataGenres);

    paginationApi.append(apiRequest.totalPages);
    paginationApi.getRefs();
  }

  async function onLastBtn(event) {
    if (!event.target.classList.value.includes('last__btn')) {
      return;
    }

    paginationApi.isLastPage = true;
    paginationApi.isLast = true;
    paginationApi.isLastForDisabled = true;

    paginationApi.setCurrPage(event.target.textContent);
    paginationApi.numberToRender = paginationApi._currentPage;
    paginationApi.deleteMarkup();

    markupApi.deleteMarkup();

    const data = await apiRequest.getTranding(paginationApi._currentPage);
    const dataGenres = await apiRequest.getGenre();
    markupApi.append(data, dataGenres);

    paginationApi.append(apiRequest.totalPages);
    paginationApi.getRefs();
  }

  async function onNextBtn(event) {
    if (
      event.target.classList.value.includes('btn-pag-next') ||
      event.target.classList.value.includes('svg-next') ||
      event.target.classList.value.includes('path-next')
    ) {
      paginationApi.isLastPage = false;

      if (paginationApi.isLastForDisabled) {
        return;
      }
      if (paginationApi.refs.changingBtns[0].textContent === '2') {
        paginationApi.numberToRender = 1;
      }

      paginationApi.numberToRender += 6;
      paginationApi._currentPage = paginationApi.numberToRender;

      paginationApi.deleteMarkup();

      markupApi.deleteMarkup();

      const data = await apiRequest.getTranding(paginationApi.numberToRender);
      const dataGenres = await apiRequest.getGenre();
      markupApi.append(data, dataGenres);

      paginationApi.append(apiRequest.totalPages);
      paginationApi.getRefs();
      if (
        Number(paginationApi.refs.changingBtns[5].textContent) ===
        apiRequest.totalPages
      ) {
        paginationApi.refs.lastBtn.setAttribute('disabled', 'true');
        paginationApi.isLastForDisabled = true;
      }
    }
  }

  async function onPrevBtn(event) {
    if (
      event.target.classList.value.includes('btn-pag-prev') ||
      event.target.classList.value.includes('svg-prev') ||
      event.target.classList.value.includes('path-prev')
    ) {
      paginationApi.isLastPage = false;

      if (paginationApi.refs.changingBtns[0].textContent === '1') {
        return;
      }

      if (paginationApi.isLast) {
        paginationApi.numberToRender += -11;
      } else {
        paginationApi.numberToRender += -6;
      }

      paginationApi.isLast = false;
      paginationApi._currentPage = paginationApi.numberToRender;

      paginationApi.deleteMarkup();

      markupApi.deleteMarkup();

      const data = await apiRequest.getTranding(paginationApi.numberToRender);
      const dataGenres = await apiRequest.getGenre();
      markupApi.append(data, dataGenres);

      paginationApi.append(apiRequest.totalPages, paginationApi.placeToApp);
      paginationApi.getRefs();
      if (
        Number(paginationApi.refs.currentBtn.textContent) <
        apiRequest.totalPages - 6
      ) {
        paginationApi.isLastForDisabled = false;
      }
    }
    // paginationApi.isFirstRender = true;
  }
}