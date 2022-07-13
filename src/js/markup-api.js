import ApiRequest from './genre-trand-request';

import { refs } from './refs';

const apiRequest = new ApiRequest();
const DEFAULT_IMG_PATH = 'https://i.ibb.co/nBhDC2Z/enjoy-min-def.jpg';

export class MarkupApi {
  constructor() {
    this.filmId = '';
    this.isMainPage = false;
  }

  makeGalleryCardsMarkup(filmsData, dataGenres) {
    const currentLocation = window.location.pathname;
    if (currentLocation === '/index.html' || currentLocation === '/') {
      this.isMainPage = true;
    } else {
      this.isMainPage = false;
    }

    let result;
    let imageURL = 'https://image.tmdb.org/t/p/';
    result = filmsData

      .map(
        ({
          id,
          poster_path,
          genre_ids,
          title,
          name,
          release_date,
          vote_average,
          original_title,
          first_air_date,
        } = {}) => {
          if (genre_ids) {
            let genresArray;
            let uniqueGenres = [];

            genresArray = dataGenres
              .filter(genre => genre_ids.includes(genre.id))
              .map(genre => genre.name);
            let date = new Date(release_date);

            if (genresArray.length > 0) {
              uniqueGenres = genresArray
                .filter((genre, index, array) => array.indexOf(genre) === index)
                .join(', ');
            } else {
              uniqueGenres = ['Movie'];
            }

            let date2 = new Date(first_air_date);
            let year = date.getFullYear();
            let year2 = date2.getFullYear();
            let vote = vote_average.toFixed(1);
            let imageMarkup = '';

            if (poster_path) {
              imageMarkup = `<picture>
                <source
                    srcset="
                    ${imageURL}w780${poster_path}     1x,
                    ${imageURL}original${poster_path} 2x
                    "
                    media="(min-width: 1024px)"
                    
                />
                <source
                    srcset="
                    ${imageURL}w500${poster_path} 1x,
                    ${imageURL}w780${poster_path} 2x
                    "
                    media="(min-width: 768px)"
                />
                <source
                    srcset="
                    ${imageURL}w342${poster_path} 1x,
                    ${imageURL}w500${poster_path} 2x
                    "
                    media="(min-width: 320px)"
                />
                <img
                    src="${imageURL}original${poster_path}" loading="lazy"
                    alt="${original_title}"
                    class="film-card__image"
                    
                />
                </picture>`;
            } else {
              imageMarkup = `<img class="default-img" loading="lazy" alt="${original_title}" src="${DEFAULT_IMG_PATH}"/>`;
            }

            let markUp = `<li class="gallery-item" data-id="${id}">
        <a class="gallery__link" href="#" data-action="${id}" onclick="return false">
            <div class="film-card">
            <div class="film-card__image">${imageMarkup}</div>
            <div class="card">
                <p class="card__name">${title || name}</p>
                <div class="card__text">
                <p class="card__genre">${uniqueGenres} | <span>${
              year || year2 || ''
            }</span></p>          
                <p class="card__rate ${
                  this.isMainPage ? 'visually-hidden' : ''
                }">${vote}</p>
                </div>
            </div>
            </div>
        </a>
        </li>`;
            return markUp;
          }
        }
      )
      .join('');
    return result;
  }

  append(filmsData, dataGenres) {
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      this.makeGalleryCardsMarkup(filmsData, dataGenres)
    );
  }

  deleteMarkup() {
    refs.gallery.innerHTML = '';
  }

  // Цей метод приймає дані (масив об'єктів) там відмальовує їх в розмітці.
  // Використовувати його під час роботи з localStorage та з пошуком фільмів по назві
  async renderMarkUp(filmData) {
    const dataGenres = await apiRequest.getGenre();

    this.append(filmData, dataGenres);
  }
}
