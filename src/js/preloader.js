window.addEventListener('DOMContentLoaded', () => {
  let preloader = document.querySelector('#preloader');

  preloader.classList.add('hide-preloader');
  setTimeout(() => {
    preloader.classList.add('preloader-hiden');
  }, 950);
});
