const API_KEY = '83cba2c85d0df477852b094af9fbdddb';
const URL = 'https://api.themoviedb.org/3';
import { refs } from './refs';

export default class CreateApiService {
  constructor() {
    this.serchQuery = ' ';
    this.page = 1;
  }

  fetchResults(query) {
    //refs.preloader.classList.add('hide-preloader');
    const url = `${URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${this.page}`;
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.showMore();
        //refs.preloader.classList.add('preloader-hiden');
        return data.results;
      });
  }

  showMore() {
    this.page += 1;
  }

  // resetPage() {
  //     this.page = 1;
  // }

  get query() {
    return this.serchQuery;
  }

  set query(newQuery) {
    return (this.serchQuery = newQuery);
  }
}
