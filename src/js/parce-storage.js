import { Notify } from 'notiflix';

Notify.init({
  width: '200px',
  position: 'right-top',
  distance: '10px',
  borderRadius: '5px',
  timeout: 3000,
  pauseOnHover: true,
});

const watchedF = () => {
  try {
    return JSON.parse(localStorage.getItem('watchedMovies'));
  } catch (error) {
    Notify.failure(error, "W");
  }
};
const queueF = () => {
  try {
    return JSON.parse(localStorage.getItem('queuedMovies'));
  } catch (error) {
    Notify.failure(error, "Q");
  }
};

export { watchedF, queueF };
