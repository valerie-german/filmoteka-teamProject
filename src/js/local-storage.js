import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showPreloader, hidePreloader } from './preloader';
import { watchedF, queueF } from './parce-storage';

const galleryList = refs.gallery;
const currentLocation = window.location.pathname;
const viewedFilms = watchedF();
const filmsForWatching = queueF();
const noContentUl = document.querySelector('.gallery-home');

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

    refs.watched.addEventListener('click', () => {
    refs.queue.classList.remove('is-active');
    refs.watched.classList.add('is-active');
    getFromWatched();
});
 

  refs.queue.addEventListener('click', () => {
  refs.watched.classList.remove('is-active');
    refs.queue.classList.add('is-active');
    getFromQueue();
  });
    
    
  });
}

function getFromWatched() {
  clearGallery();

  try {
    if (viewedFilms.length<1) {
       markupNoContent();
    } else  {
      showPreloader();
      markupOfSavedFilms(viewedFilms);
    }
    
  } catch (error) {
      markupNoContent();
  }

  setTimeout(() => {
    hidePreloader();
  }, 600);
}

function getFromQueue() {
   clearGallery();
  try {
    if (filmsForWatching.length<1) {
         markupNoContent();
    } else  {
      showPreloader();
      markupOfSavedFilms(filmsForWatching);
    }
    
  } catch (error) {
      markupNoContent();
  }

  setTimeout(() => {
    hidePreloader();
  }, 600);
}


function markupNoContent() {
  //clearGallery();
 // let markup = `<img src="https://i.ibb.co/GWYydks/no-content.jpg" alt="nothing is here">`;
  let markup =`<div class="slumb"></div>`;
  noContentUl.innerHTML = markup;
  document.querySelector('.gallery').classList.add('section-reset');
  document.querySelector('.gallery__pagination').classList.add('visually-hidden');
 }

function markupOfSavedFilms(array) {
  const defaultImgPath = 'https://i.ibb.co/4gF0DzF/enjoy-min.jpg';
  const imageURL = 'https://image.tmdb.org/t/p/';

  let markup = array

    .map(
      ({ id, poster_path, title, release_date, vote_average, genres } = {}) => {
        let date = new Date(release_date);
        let year = date.getFullYear();
        const genre = genres.map(genre => genre.name).join(', ');
        let imageMarkup = '';

        if (poster_path) {
          imageMarkup = `<picture>
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
                  loading="lazy"
                  alt="${title}"
                  class="film-card__image"
              />
              </picture>`;
        }
        else { 
              imageMarkup = `<img class="default-img" loading="lazy" alt="${original_title}" src="${DEFAULT_IMG_PATH}"/>`;
            }

        return `<li class="gallery-item" data-id="${id}">
        <a class="gallery__link" href="" data-action="" onclick="return false">
            <div class="film-card">
           <div class="film-card__image">${imageMarkup}</div>
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
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  document.querySelector('.gallery__pagination').classList.remove('visually-hidden');
}

function clearGallery() {
  galleryList.innerHTML = '';
}
