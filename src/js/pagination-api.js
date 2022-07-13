import { refs } from './refs';

export class PaginApi {
  constructor() {
    this.jus = true;
    this.jus2 = false;
    this.isLastPage = false;
    this.isLast = false;
    this.isLastForDisabled = false;
    this.numberToRender = 1;
    this.screenWidth = '';
    this.query = '';
    this.refs = {};
    this._currentPage = 1;
    this.isFirstRender = true;
    this.totalPages = '';
  }

  deleteMarkup() {
    refs.pagination.innerHTML = '';
  }

  setCurrPage(newPage) {
    this._currentPage = Number(newPage);
  }

  createPagiMarkup(totalPage) {
    {
      const array = [];
      let lastPageBtn = totalPage;
      array.push(`
        <li class="pagination-btns__item">
        <button class="pagination-btns__btn btn-pag-previ" name="button" data-action="previ">
        <svg
          class="svg svg-prev"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="path-prev"
            d="M12.6666 8H3.33325"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="path-prev"
            d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      </li>
        <li class="pagination-btns__item">
          <button name="button" class="pagination-btns__btn first__btn btn-page">1</button>
        </li>
        <li class="pagination-btns__item">
          <button name="button" class="pagination-btns__btn dots__btn" disabled="true">...</button>
        </li>
        `);
      if (totalPage > 6) {
        lastPageBtn = 6;
      }
      if (!this.isLastPage) {
        for (let index = 0; index < lastPageBtn; index += 1) {
          let currentP = this.numberToRender;
          array.push(`<li class="pagination-btns__item">
          <button name="button" class="pagination-btns__btn btn__static btn-page${
            currentP + index
          } btn-page-number${currentP + index}">${
            currentP + index
          }</buttonclass=>
        </li>`);
        }
      } else {
        for (let index = 6; index > 0; index -= 1) {
          let currentP = this.numberToRender;
          array.push(`<li class="pagination-btns__item">
          <button name="button" class="pagination-btns__btn btn__static btn-page${
            currentP - index + 1
          } btn-page-number${currentP - index + 1}">${
            currentP - index + 1
          }</button>
        </li>`);
        }
      }

      array.push(`<li class="pagination-btns__item">
          <button name="button" class="pagination-btns__btn dots__btn" disabled="true">...</button>
        </li>
        <li class="pagination-btns__item">
          <button name="button" class="pagination-btns__btn last__btn btn-page${totalPage}">${totalPage}</button>
        </li>
        <li class="pagination-btns__item">
        <button name="button" class="pagination-btns__btn btn-pag-next" data-action="next">
        <svg
          class="svg svg-next"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="path-next"
            d="M12.6666 8H3.33325"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="path-next"
            d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button></li>`);

      return array.join('');
    }
  }

  append(totalPage) {
    refs.pagination.insertAdjacentHTML(
      'afterbegin',
      this.createPagiMarkup(totalPage)
    );

    this.getRefs();
    this.refs.currentBtn.classList.add('btn-pag--current');

    if (this.refs.changingBtns.length < 6) {
      this.refs.btnPrev.classList.add('visually-hidden');
      this.refs.firstBtn.classList.add('visually-hidden');
      this.refs.lastBtn.classList.add('visually-hidden');
      this.refs.btnNext.classList.add('visually-hidden');
    }

    if (this.refs.changingBtns[0].textContent === '1') {
      this.refs.btnPrev.setAttribute('disabled', 'true');
    }

    if (
      Number(this.refs.changingBtns[0].textContent) ===
      this.refs.lastBtn.textContent - 5
    ) {
      this.refs.btnNext.setAttribute('disabled', 'true');
    }
  }

  getRefs() {
    this.refs = {
      paginationBtns: document.querySelector('.gallery__pagination'),
      btnPrev: document.querySelector('.btn-pag-previ'),
      firstBtn: document.querySelector('.first__btn'),
      changingBtns: document.querySelectorAll('.btn__static'),
      lastBtn: document.querySelector('.last__btn'),
      btnNext: document.querySelector('.btn-pag-next'),
      currentBtn: document.querySelector(`.btn-page${this._currentPage}`),
    };
  }
}
