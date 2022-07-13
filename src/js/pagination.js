import { PaginApi } from './pagination-api';

import ApiRequest from './genre-trand-request';
import { MarkupApi } from './markup-api';

const paginationApi = new PaginApi();
const apiRequest = new ApiRequest();
const markupApi = new MarkupApi();

export function pagiListeners(query) {
  paginationApi.getRefs();
  paginationApi.query = query;

  const refs = {
    ...paginationApi.refs,
  };

  if (!paginationApi.query) {
    refs.paginationBtns.addEventListener('click', onPaginationBtns);

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

      if (paginationApi.refs.changingBtns.length < 6) {
        paginationApi.isLastPage = false;
        paginationApi.numberToRender = 1;
      }
      let data;

      paginationApi.setCurrPage(event.target.textContent);

      paginationApi.deleteMarkup();

      markupApi.deleteMarkup();

      if (paginationApi.query) {
        data = await apiRequest.searchFilms(
          paginationApi._currentPage,
          paginationApi.query
        );
      } else {
        data = await apiRequest.getTranding(paginationApi._currentPage);
      }

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
      paginationApi.isLast = false;
      paginationApi.isLastForDisabled = false;

      paginationApi.numberToRender = 1;
      paginationApi.setCurrPage(event.target.textContent);

      paginationApi.deleteMarkup();

      markupApi.deleteMarkup();

      if (paginationApi.query) {
        data = await apiRequest.searchFilms(
          paginationApi._currentPage,
          paginationApi.query
        );
      } else {
        data = await apiRequest.getTranding(paginationApi._currentPage);
      }
      const dataGenres = await apiRequest.getGenre();
      markupApi.append(data, dataGenres);

      paginationApi.append(apiRequest.totalPages);
      paginationApi.getRefs();
    }

    async function onLastBtn(event) {
      if (!event.target.classList.value.includes('last__btn')) {
        return;
      }
      if (paginationApi.refs.changingBtns.length < 6) {
        return;
      }

      if (event.target.textContent === '1') {
        return;
      }

      paginationApi.isLastPage = true;
      paginationApi.isLast = true;
      paginationApi.isLastForDisabled = true;

      paginationApi.setCurrPage(event.target.textContent);
      paginationApi.numberToRender = paginationApi._currentPage;
      paginationApi.deleteMarkup();

      markupApi.deleteMarkup();

      if (paginationApi.query) {
        data = await apiRequest.searchFilms(
          paginationApi._currentPage,
          paginationApi.query
        );
      } else {
        data = await apiRequest.getTranding(paginationApi._currentPage);
      }
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
        if (paginationApi.refs.changingBtns.length < 6) {
          return;
        }
        if (
          Number(paginationApi.refs.lastBtn.textContent) - 1 ===
          Number(paginationApi.refs.changingBtns[5].textContent)
        ) {
          return;
        }
        paginationApi.isLastPage = false;
        if (
          paginationApi.refs.changingBtns[0].textContent ===
          String(apiRequest.totalPages - 5)
        ) {
          paginationApi.isLastPage = true;
          return;
        }
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

        if (paginationApi.query) {
          data = await apiRequest.searchFilms(
            paginationApi._currentPage,
            paginationApi.query
          );
        } else {
          data = await apiRequest.getTranding(paginationApi.numberToRender);
        }
        const dataGenres = await apiRequest.getGenre();
        markupApi.append(data, dataGenres);

        paginationApi.append(apiRequest.totalPages);
        paginationApi.getRefs();
        if (
          Number(paginationApi.refs.changingBtns[5].textContent) ===
          apiRequest.totalPages
        ) {
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

        if (
          Number(paginationApi.refs.lastBtn.textContent) - 1 ===
          Number(paginationApi.refs.changingBtns[5].textContent)
        ) {
          return;
        }

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

        if (paginationApi.query) {
          data = await apiRequest.searchFilms(
            paginationApi._currentPage,
            paginationApi.query
          );
        } else {
          data = await apiRequest.getTranding(paginationApi.numberToRender);
        }
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
    }
  }
}
