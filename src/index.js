import './js/modal';
import './js/preloader';
import { refs } from './js/refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiRequest from './js/genre-trand-request';
import { defaultGalleyRender } from './js/default-gallery-render';

const API_KEY = '83cba2c85d0df477852b094af9fbdddb';
const axios = require('axios').default;
defaultGalleyRender();
// ------------------ЗАПИТ ПО ТРЕНДАМ-------------------
const apiRequest = new ApiRequest();
const currentLocation = window.location.pathname;

window.addEventListener('DOMContentLoaded', searchByTranding);

function searchByTranding() {
  if (currentLocation === '/index.html') {
    apiRequest.getTranding().then(responce => responce);
  }
}
