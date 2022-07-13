import { refs } from './refs';

function showPreloader() {
  refs.preloader.classList.remove('preloader-hidden');
}

function hidePreloader() {
  refs.preloader.classList.add('preloader-hidden');
}

export { showPreloader, hidePreloader };

window.addEventListener('DOMContentLoaded', () => {
  showPreloader();
  window.setTimeout(() => {
    hidePreloader();
  }, 700);
});
