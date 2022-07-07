import ApiRequest from './js/genre-trand-request';

// ------------------ЗАПИТ ПО ТРЕНДАМ-------------------
const apiRequest = new ApiRequest();
const currentLocation = window.location.pathname;

window.addEventListener('DOMContentLoaded', searchByTranding);

function searchByTranding() {
  if (currentLocation === '/index.html') {
    apiRequest.getTranding().then(responce => responce);
  }
}
