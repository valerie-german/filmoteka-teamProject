import './js/modal';
import './js/preloader';
import './js/scroll-up';
import './js/local-storage';
import './js/parce-storage';
import './js/themePage';
import { defaultGalleyRender } from './js/default-gallery-render';

// ------------------ЗАПИТ ПО ТРЕНДАМ-------------------

const currentLocation = window.location.pathname;

window.addEventListener('DOMContentLoaded', searchByTranding);
function searchByTranding() {
  if (
    currentLocation === '/filmoteka-teamProject/index.html' ||
    currentLocation === '/filmoteka-teamProject/'
  ) {
    defaultGalleyRender();
  }
}
