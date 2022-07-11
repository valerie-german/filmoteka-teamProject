import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const galleryList = refs.gallery;
const currentLocation = window.location.pathname;
const viewedFilms = JSON.parse(localStorage.getItem('watchedMovies'));
const filmsForWatching = JSON.parse(localStorage.getItem('queuedMovies'));

if (currentLocation === '/my-library.html') {
  window.addEventListener('DOMContentLoaded', () => {
    refs.watched.classList.add('is-active');
    markupOfSavedFilms();
    refs.watched.addEventListener('click', getSavedFilms);
    refs.queue.addEventListener('click', getFilmsFromQueue);
  });
}

function getSavedFilms() {
  clearGallery();
  markupOfSavedFilms();
}

function getFilmsFromQueue() {
  clearGallery();
  markupOfFilmsFromQueue();
}

function markupOfSavedFilms() {
  const defaultImgPath = 'https://i.ibb.co/4gF0DzF/enjoy-min.jpg';
  const imageURL = 'https://image.tmdb.org/t/p/';

  let markup = viewedFilms

    .map(
      ({ id, poster_path, title, release_date, vote_average, genres = {} }) => {
        let date = new Date(release_date);
        let year = date.getFullYear();
        const genre = genres.map(genre => genre.name).join(', ');

        return `
        <li class="gallery-item" data-id="${id}">
        <a class="gallery__link" href="" data-action="" onclick="return false">
            <div class="film-card">
           <div class="film-card__image">
              <picture>
              <source
                  srcset="
                  ${imageURL || defaultImgPath}w780${poster_path}     1x,
                  ${imageURL || defaultImgPath}original${poster_path} 2x
                  "
                  media="(min-width: 1024px)"
              />
              <source
                  srcset="
                  ${imageURL || defaultImgPath}w500${poster_path} 1x,
                  ${imageURL || defaultImgPath}w780${poster_path} 2x
                  "
                  media="(min-width: 768px)"
              />
              <source
                  srcset="
                  ${imageURL || defaultImgPath}w185${poster_path} 1x,
                  ${imageURL || defaultImgPath}w500${poster_path} 2x
                  "
                  media="(min-width: 320px)"
              />
              <img
                  src="${imageURL || defaultImgPath}original${poster_path}"
                  alt="${title}"
                  class="film-card__image"
              />
              </picture>
          </div>

            <div class="card">
                <p class="card__name">${title}</p>
                <div class="card__text">
                <p class="card__genre">${genre}</p>
                <p class="card__year">${year}</p>
                <p class="card__rate">${vote_average}</p>
                </div>
            </div>
            </div>
        </a>
        </li>`;
      }
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);
}

function markupOfFilmsFromQueue() {
  refs.watched.classList.remove('is-active');

  const defaultImgPath = 'https://i.ibb.co/4gF0DzF/enjoy-min.jpg';
  const imageURL = 'https://image.tmdb.org/t/p/';

  let markup = filmsForWatching
    .map(
      ({ id, poster_path, title, release_date, vote_average, genres } = {}) => {
        let date = new Date(release_date);
        let year = date.getFullYear();
        const genre = genres.map(genre => genre.name).join(', ');

        return `
        <li class="gallery-item" data-id="${id}">
        <a class="gallery__link" href="" data-action="" onclick="return false">
            <div class="film-card">
           <div class="film-card__image">
              <picture>
              <source
                  srcset="
                  ${imageURL || defaultImgPath}w780${poster_path}     1x,
                  ${imageURL || defaultImgPath}original${poster_path} 2x
                  "
                  media="(min-width: 1024px)"
              />
              <source
                  srcset="
                  ${imageURL || defaultImgPath}w500${poster_path} 1x,
                  ${imageURL || defaultImgPath}w780${poster_path} 2x
                  "
                  media="(min-width: 768px)"
              />
              <source
                  srcset="
                  ${imageURL || defaultImgPath}w185${poster_path} 1x,
                  ${imageURL || defaultImgPath}w500${poster_path} 2x
                  "
                  media="(min-width: 320px)"
              />
              <img
                  src="${imageURL || defaultImgPath}original${poster_path}"
                  alt="${title}"
                  class="film-card__image"
              />
              </picture>
          </div>

            <div class="card">
                <p class="card__name">${title}</p>
                <div class="card__text">
                <p class="card__genre">${genre}</p>
                <p class="card__year">${year}</p>
                <p class="card__rate">${vote_average}</p>
                </div>
            </div>
            </div>
        </a>
        </li>`;
      }
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  galleryList.innerHTML = '';
}
