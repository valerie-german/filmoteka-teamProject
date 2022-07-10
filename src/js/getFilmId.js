import { MarkupApi } from './markup-api';

const markupApi = new MarkupApi();

export function getFilmId() {
  const galleryLink = document.querySelectorAll('.gallery-home');

  galleryLink[0].addEventListener('click', event => {
    if (event.target.nodeName === 'UL') {
      return;
    }
    markupApi.filmId = event.target.closest('.gallery-item').dataset.id;
  });
}
