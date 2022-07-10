const API_KEY = '83cba2c85d0df477852b094af9fbdddb';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';

export default class ApiRequest {
  constructor() {
    this.query = '';
    this.page = 1;
    this.totalPages = 1;
  }

  async getGenre() {
    try {
      const responce = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US&page=${this.page}`
      );
      // this.page += 1;
      return responce.data.genres;
    } catch (error) {
      Notify.failure(error);
    }
  }

  async getTranding(pageNumber) {
    try {
      refs.preloader.classList.add('hide-preloader');
      const responce = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${pageNumber}`
      );
      // this.page += 1;
      this.totalPages = await responce.data.total_pages;
      refs.preloader.classList.add('preloader-hiden');
      return responce.data.results;
    } catch (error) {
      Notify.failure(error);
    }
  }

  async searchFilms(pageNumber, query) {
    refs.preloader.classList.add('hide-preloader');
    const responce = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${pageNumber}&include_adult=false&query="${query}"`
    );

    this.totalPages = await responce.data.total_pages;
    refs.preloader.classList.add('preloader-hiden');
    return responce.data.results;
  }
}
