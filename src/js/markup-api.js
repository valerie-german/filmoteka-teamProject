import ApiRequest from './genre-trand-request';

// import { renderPagination } from './render-pagination';
import { refs } from './refs';

const apiRequest = new ApiRequest();

export class MarkupApi {
  constructor() {
    this.filmId = '';
  }

  makeGalleryCardsMarkup(filmsData, dataGenres) {
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
        }) => {
          if (genre_ids) {
            let genresArray;
            let uniqueGenres = [];

            genresArray = dataGenres
              .filter(genre => genre_ids.includes(genre.id))
              .map(genre => genre.name);
            let date = new Date(release_date);

            if (genresArray.length > 0) {
              uniqueGenres = genresArray.filter(
                (genre, index, array) => array.indexOf(genre) === index).join(', ');
            }
            else { 
              uniqueGenres = ["Movie"];
            }
               
            

            let date2 = new Date(first_air_date);
            let year = date.getFullYear();
            let year2 = date2.getFullYear();
            let vote = vote_average.toFixed(1);
            return ` 
        <li class="gallery-item" data-id="${id}">
        <a class="gallery__link" href="" data-action="${id}" onclick="return false">
            <div class="film-card">
            <div class="film-card__image">
                <picture>
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
                    ${imageURL}w185${poster_path} 1x,
                    ${imageURL}w500${poster_path} 2x
                    "
                    media="(min-width: 320px)"
                />
                <img
                    src="${imageURL}original${poster_path}"
                    alt="${original_title}"
                    class="film-card__image"
                />
                </picture>
            </div>

            <div class="card">
                <p class="card__name">${title || name}</p>
                <div class="card__text">
                <p class="card__genre">${uniqueGenres}</p>
                <p class="card__year">${year || year2}</p>
                <p class="card__rate">${vote}</p>
                </div>
            </div>
            </div>
        </a>
        </li>

        `;
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
