// const refs = {
//     openModalFooter: document.querySelector('.footer-link'),
//     closeModalBtnFooter: document.querySelector('.team-modal__close'),
//     backdropFooter: document.querySelector('.team-modal'),
//     galleryLink: document.querySelector('.gallery__link'),
//     btnModal: document.querySelector('.modal-close'),
//     backdrop: document.querySelector('.backdrop')
// }

// refs.openModalFooter.addEventListener('click', openModal);
// refs.closeModalBtnFooter.addEventListener('click', closeModal);
// refs.backdropFooter.addEventListener('click', onClickBackdrop);

// refs.galleryLink.addEventListener('click', openModalGallery);
// refs.btnModal.addEventListener('click', closeModalGallery);
// refs.backdrop.addEventListener('click', onClickBackdrop);

// function openModal() {
//     refs.backdropFooter.classList.remove('backdrop--hidden')
//     document.body.style.overflow = "hidden";
//     window.addEventListener('keydown', onEscKeyPress)

// };
// function closeModal() {
//     refs.backdropFooter.classList.add('backdrop--hidden');
//     document.body.style.overflow = "";
//     window.removeEventListener('keydown', onEscKeyPress)
// }
// function onClickBackdrop(event) {
//     if (event.currentTarget === event.target) {

//         closeModal();
//         closeModalGallery();
//  }
// };

// function openModalGallery() {
//     window.addEventListener('keydown', onEscKeyPress )
//     refs.backdrop.classList.remove('backdrop--hidden')
// document.body.style.overflow = "hidden";

// };

// function closeModalGallery() {
//     refs.backdrop.classList.add('backdrop--hidden');
//     document.body.style.overflow = "";
// }

// function onEscKeyPress(event) {
//     if (event.code === 'Escape') {
//          closeModal();
//     closeModalGallery();
//     }

// }
