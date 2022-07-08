const API_KEY = '83cba2c85d0df477852b094af9fbdddb';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class ApiRequest {
  constructor() {
    this.page = 1;
  }

  async getGenre() {
    try {
      const responce = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US&page=${this.page}`
      );
      this.page += 1;
      return responce.data;
    } catch (error) {
      Notify.failure(error);
    }
  }

  async getTranding() {
    try {
      const responce = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${this.page}`
      );
      this.page += 1;
      return responce.data.results;
    } catch (error) {
      Notify.failure(error);
    }
  }
}
