import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showPreloader, hidePreloader } from './preloader';
import { watchedF, queueF } from './parce-storage';

export { getFromWatched, getFromQueue };

const galleryList = refs.gallery;
const currentLocation = window.location.pathname;

Notify.init({
  width: '200px',
  position: 'right-top',
  distance: '10px',
  borderRadius: '5px',
  timeout: 3000,
  pauseOnHover: true,
});

if (currentLocation === '/my-library.html') {
  window.addEventListener('DOMContentLoaded', () => {
    refs.watched.classList.add('is-active');
    refs.queue.classList.remove('is-active');
    getFromWatched();
  });
  refs.queue.addEventListener('click', () => {
    refs.watched.classList.remove('is-active');
    refs.queue.classList.add('is-active');
    getFromQueue();
  });

  refs.watched.addEventListener('click', () => {
    refs.watched.classList.add('is-active');
    refs.queue.classList.remove('is-active');
    getFromWatched();
  });
}

function getFromWatched() {
  clearGallery();

  let viewedFilms = watchedF();

  try {
    if (viewedFilms.length < 1) {
      markupNoContent();
    } else {
      showPreloader();
      createGallery(viewedFilms);
    }
  } catch (error) {
    markupNoContent();
  }

  setTimeout(() => {
    hidePreloader();
  }, 600);
}

function getFromQueue() {
  try {
    let filmsForWatching = queueF();
    if (filmsForWatching.length < 1) {
      markupNoContent();
    } else {
      showPreloader();
      createGallery(filmsForWatching);
    }
  } catch (error) {
    markupNoContent();
  }

  setTimeout(() => {
    hidePreloader();
  }, 600);
}

function markupNoContent() {
  refs.galleryHome.innerHTML = `<div class="slumb"></div>`;
  document.querySelector('.gallery').classList.add('section-reset');
  document
    .querySelector('.gallery__pagination')
    .classList.add('visually-hidden');
}

const defaultImgPath = 'https://i.ibb.co/4gF0DzF/enjoy-min.jpg';
const imageURL = 'https://image.tmdb.org/t/p/';

function createSource({ host, poster_path, width1, width2, min_width } = {}) {
  return `<source 
    srcset="${host}${width1}${poster_path} 1x, ${host}${width2}${poster_path} 2x"
    media="(min-width: ${min_width})"
  />`;
}

function createImage({ displayImageUrl, poster_path, title } = {}) {
  return `<img
    src="${displayImageUrl}original${poster_path}"
    loading="lazy"
    alt="${title}"
    class="film-card__image"
  />`;
}

function createDefaultImage({ title, default_url } = {}) {
  return `<img class="default-img" loading="lazy" alt="${title}" src="${default_url}"/>`;
}

function createGalleryItemImage({ host, poster_path, title } = {}) {
  return `<picture> 
      ${createSource({
        host,
        poster_path,
        width1: 'w780',
        width2: 'original',
        min_width: '1024px',
      })}
      ${createSource({
        host,
        poster_path,
        width1: 'w500',
        width2: 'w780',
        min_width: '768px',
      })}
      ${createSource({
        host,
        poster_path,
        width1: 'w185',
        width2: 'w500',
        min_width: '320px',
      })}
      ${createImage({ host, poster_path, title })}
      </picture>`;
}

function createGalleryItemImageOrDefault({ poster_path, title } = {}) {
  let host = poster_path ? imageURL : defaultImgPath;

  return poster_path
    ? createGalleryItemImage({ host, poster_path, title })
    : createDefaultImage({ title, default_url: DEFAULT_IMG_PATH });
}

function createGalleryItem({
  id,
  poster_path,
  title,
  release_date,
  vote_average,
  genres,
} = {}) {
  let year = new Date(release_date).getFullYear();
  const genre = genres.map(genre => genre.name).join(', ');

  let imageItem = createGalleryItemImageOrDefault({ poster_path, title });

  return `<li class="gallery-item" data-id="${id}">
            <a class="gallery__link" href="#" data-action="" onclick="return false">
              <div class="film-card">
              <div class="film-card__image">${imageItem}</div>
              <div class="card">
                <p class="card__name">${title}</p>
                <div class="card__text">
                <p class="card__genre">${genre} | <span class="card__year">${year}</span></p>                
                <p class="card__rate">${vote_average}</p>
                </div>
              </div>
              </div>
            </a>
        </li>`;
}

function createGallery(films) {
  let galleryItems = films.map(film => createGalleryItem(film)).join('');

  // let gallery = `<ul class="gallery-home-list" id="gallery-home-list">${galleryItems}</ul>`;

  refs.gallery.innerHTML = galleryItems;

  document
    .querySelector('.gallery__pagination')
    .classList.remove('visually-hidden');
}

function clearGallery() {
  galleryList.innerHTML = '';
}
