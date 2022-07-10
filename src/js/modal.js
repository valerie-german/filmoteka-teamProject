const API_KEY = '83cba2c85d0df477852b094af9fbdddb';
const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio'

const refs = {
    openModalFooter: document.querySelector('.footer-link'),
    closeModalBtnFooter: document.querySelector('.team-modal__close'),
    backdropFooter: document.querySelector('.team-modal'),
    galleryLink: document.querySelectorAll('.gallery-home'),
    btnModal: document.querySelector('.modal-close'),
    backdrop: document.querySelector('.backdrop')
}

refs.openModalFooter.addEventListener('click', openModal);
refs.closeModalBtnFooter.addEventListener('click', closeModal);
refs.backdropFooter.addEventListener('click', onClickBackdrop);

refs.galleryLink[0].addEventListener('click', onClickSearchAndRenderById);

refs.btnModal.addEventListener('click', closeModalGallery);
refs.backdrop.addEventListener('click', onClickBackdrop);



function openModal() {
    refs.backdropFooter.classList.remove('backdrop--hidden')
    document.body.style.overflow = "hidden";
    window.addEventListener('keydown', onEscKeyPress)
  

};
function closeModal() {
    refs.backdropFooter.classList.add('backdrop--hidden');
    document.body.style.overflow = "";  
    window.removeEventListener('keydown', onEscKeyPress)
}
function onClickBackdrop(event) {
    if (event.currentTarget === event.target) {
           
        closeModal();
        closeModalGallery();
 }
};


function closeModalGallery() {
    refs.backdrop.classList.add('backdrop--hidden');
    document.body.style.overflow = "";  
}

function onEscKeyPress(event) {
    if (event.code === 'Escape') {
         closeModal();
    closeModalGallery();
    }    
}



async function onClickSearchAndRenderById(event) {
    
    if (event.target.nodeName === 'UL') {
      return;
    }
    window.addEventListener('keydown', onEscKeyPress )
    refs.backdrop.classList.remove('backdrop--hidden')
    document.body.style.overflow = "hidden";
  
    const movieId = event.target.closest('.gallery-item').dataset.id;
    try {
        const { data } = await getMovieById(movieId);
        console.log(data)
            renderMovieDetails(data);
        createAndUpdateInstance(data);
        
        
    } catch (error) {
        console.log(error)
    }
}

async function getMovieById(id) {

    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
    
}


function renderMovieDetails(data) {
  const defaultImgPath = "https://i.ibb.co/4gF0DzF/enjoy-min.jpg"
  const imageURL = "https://image.tmdb.org/t/p/"
  let markUp = "";
  const { id, genres, title, original_title, overview, popularity, poster_path, vote_average, vote_count, release_date } = data;
  // const obj = { id, genres, title, poster_path, vote_average, release_date };
  // const movie = new Movie(obj);
  // console.log(movie);
  // movie.addToWatch();
  // movie.addToQueue();
  
  const genresToRender = genres.map(genre => genre.name).join(', ');
    if(poster_path) {
  markUp = `<div class="card-modal__img">
        <picture>
          <source
            srcset="
              ${imageURL}w780${poster_path}    1x,
              ${imageURL}original${poster_path} 2x
            "
            media="(min-width: 1024px)"
          />
          <source
            srcset="
              ${imageURL}w500${poster_path}    1x,
              ${imageURL}w780${poster_path} 2x
            "
            media="(min-width: 768px)"
          />
          <source
            srcset="
              ${imageURL}w185${poster_path}    1x,
              ${imageURL}w500${poster_path} 2x
            "
            media="(min-width: 320px)"
          />
          <img src="${imageURL}original${poster_path}" />
        </picture>
      </div>
      <div class="modal-meta">
        <h2 class="modal-heading">${title}</h2>
        <div class="meta-container">
          <ul class="list feature__list">
            <li class="feature__item">
              <span class="meta__feature">Vote / Votes</span>
            </li>
            <li class="feature__item">
              <span class="meta__feature">Popularity</span>
            </li>
            <li class="feature__item">
              <span class="meta__feature">Original Title</span>
            </li>
            <li class="feature__item">
              <span class="meta__feature">Genre</span>
            </li>
          </ul>

          <ul class="list value__list">
            <li class="value__item">
              <div>
                <span class="vote-votes active">${vote_average}</span> /
                <span class="vote-votes">${vote_count}</span>
              </div>
            </li>
            <li class="value__item">
              <span class="meta__value">${popularity}</span>
            </li>
            <li class="value__item">
              <span class="meta__value original-title">${original_title}</span>
            </li>
            <li class="value__item">
              <span class="meta__value">${genresToRender}</span>
            </li>
          </ul>
        </div>

        <h3 class="modal-meta__title">About</h3>
        <p class="modal-meta__discription">
          ${overview}
        </p>
        <ul class="list modal-btn__list">
          <li class="modal-btn__item">
            <button class="modal-btn modal-btn--watched" type="button">add to Watched</button>
          </li>
          <li class="modal-btn__item">
            <button class="modal-btn modal-btn--queued" type="button">add to queue</button>
          </li>
        </ul>
      </div>`;
    }
  
  
  else {
    markUp = `<div class="card-modal__img">
        <img src="${defaultImgPath}"/>
      </div>
      <div class="modal-meta">
        <h2 class="modal-heading">${title}</h2>
        <div class="meta-container">
          <ul class="list feature__list">
            <li class="feature__item">
              <span class="meta__feature">Vote / Votes</span>
            </li>
            <li class="feature__item">
              <span class="meta__feature">Popularity</span>
            </li>
            <li class="feature__item">
              <span class="meta__feature">Original Title</span>
            </li>
            <li class="feature__item">
              <span class="meta__feature">Genre</span>
            </li>
          </ul>

          <ul class="list value__list">
            <li class="value__item">
              <div>
                <span class="vote-votes active">${vote_average}</span> /
                <span class="vote-votes">${vote_count}</span>
              </div>
            </li>
            <li class="value__item">
              <span class="meta__value">${popularity}</span>
            </li>
            <li class="value__item">
              <span class="meta__value original-title">${original_title}</span>
            </li>
            <li class="value__item">
              <span class="meta__value">${genresToRender}</span>
            </li>
          </ul>
        </div>

        <h3 class="modal-meta__title">About</h3>
        <p class="modal-meta__discription">
          ${overview}
        </p>
        <ul class="list modal-btn__list">
          <li class="modal-btn__item">
            <button class="modal-btn modal-btn--watched" type="button">add to Watched</button>
          </li>
          <li class="modal-btn__item">
            <button class="modal-btn modal-btn--queued" type="button">add to queue</button>
          </li>
        </ul>
      </div>`
    }
  document.querySelector('.card-modal__container').innerHTML = markUp;

}
  
function createAndUpdateInstance({
    id,
    genres,
    poster_path,
    genre_ids,
    title,
    name,
    release_date,
    vote_average,
    original_title,
    first_air_date }) {
    const obj = {
        id,
        genres,
        poster_path,
        genre_ids,
        title,
        name,
        release_date,
        vote_average,
        original_title,
        first_air_date
    };
    const movieId = id;
    const movie = new Movie(obj);
    // console.log(id)
  // document.querySelector('.card-modal__container').innerHTML = markUp;
  document.querySelector('.modal-btn--watched').addEventListener('click', addToWatch);
  document.querySelector('.modal-btn--queued').addEventListener('click', addToQueue);
  
  
  function addToWatch() {
    movie.addToWatch();
    document.querySelector('.modal-btn--watched').textContent = "delete from watched";
      document.querySelector('.modal-btn--watched').removeEventListener('click', addToWatch);
      document.querySelector('.modal-btn--watched').addEventListener('click', removeMovieFromWatched);
      Notify.success("Added to watch");
  }

    function addToQueue() {
    movie.addToQueue()
    document.querySelector('.modal-btn--queued').textContent = "delete from queue"; 
        document.querySelector('.modal-btn--queued').removeEventListener('click', addToQueue);
        document.querySelector('.modal-btn--queued').addEventListener('click', removeMovieFromQueued);
        Notify.success("Added to queue")
  }

  function removeMovieFromWatched() {
    movie.removeFromWatched(movieId);
    document.querySelector('.modal-btn--watched').removeEventListener('click', removeMovieFromWatched);
    document.querySelector('.modal-btn--watched').addEventListener('click', addToWatch);
      document.querySelector('.modal-btn--watched').textContent = "add to Watched";
      Notify.success("Removed from watched")

  }

  function removeMovieFromQueued() {
    movie.removeFromQueued(movieId);
    document.querySelector('.modal-btn--queued').removeEventListener('click', removeMovieFromQueued);
    document.querySelector('.modal-btn--queued').addEventListener('click', addToQueue);
      document.querySelector('.modal-btn--queued').textContent = "add to queue";
      Notify.success("Removed from watched")

  }

  if (movie.inWatched(movieId)) {
    document.querySelector('.modal-btn--watched').textContent = "delete from watched";
    document.querySelector('.modal-btn--watched').removeEventListener('click', addToWatch)
    document.querySelector('.modal-btn--watched').addEventListener('click', removeMovieFromWatched)
  }

  if (movie.inQueued(movieId)) {
    document.querySelector('.modal-btn--queued').textContent = "delete from queue"; 

    document.querySelector('.modal-btn--queued').removeEventListener('click', addToQueue)
    document.querySelector('.modal-btn--queued').addEventListener('click', removeMovieFromQueued)
  }
}
    

class Movie {
    constructor({ id,
        poster_path,
          genres,
          genre_ids,
          title,
          name,
          release_date,
          vote_average,
          original_title,
          first_air_date } = {}) {
        
        this.id = id;
        this.poster_path = poster_path;
        this.genres = genres;
        this.genre_ids = genre_ids;
        this.title = title;
        this.name = name;
        this.vote_average = vote_average;
        this.release_date = release_date;
        this.original_title = original_title;
        this.first_air_date = first_air_date;

    }
    
  addToWatch() {
    let movies = [];
    movies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    movies.push(this);
    localStorage.setItem('watchedMovies', JSON.stringify(movies));
  }

  addToQueue() {
    let movies = [];
    movies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
    movies.push(this);
    localStorage.setItem('queuedMovies', JSON.stringify(movies));
  }
  
  inWatched(movieId) {
    try {
            if (JSON.parse(localStorage.getItem('watchedMovies')).find(item => item.id === movieId)) {
                return true;
            }
        }
        catch (error) {
            console.log(error)
        }
  }

    inQueued(movieId) {
        try {
            if (JSON.parse(localStorage.getItem('queuedMovies')).find(item => item.id === movieId)) {
                return true;
            }
        }
        catch (error) {
            console.log(error)
        }
    }

  removeFromWatched(movieId) {
     let movies = JSON.parse(localStorage.getItem("watchedMovies"))
        let i =movies.findIndex(movie=>movie.id===movieId);
    if (i !== -1) {
      movies.splice(i, 1);
      localStorage.setItem('watchedMovies', JSON.stringify(movies));
    }
  }

  removeFromQueued(movieId) {
let movies = JSON.parse(localStorage.getItem("queuedMovies"))
        let i =movies.findIndex(movie=>movie.id===movieId);
    if (i !== -1) {
      movies.splice(i, 1);
      localStorage.setItem('queuedMovies', JSON.stringify(movies));
    }
  }
}
