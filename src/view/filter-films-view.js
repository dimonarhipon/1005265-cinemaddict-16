import AbstractView from './abstract-view';
import {SortType} from '../const.js';

const createFilterFilms = () => `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
</ul>`;

export default class FilterFilmsView extends AbstractView {
  get template() {
    return createFilterFilms();
  }

  setFilterClickHandler = (callback) => {
    this._callback.filterChange = callback;
    this.element.addEventListener('click', this.#filterClickHandler);
  }

  #filterClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.#handleActiveClassChange(evt);
    this._callback.filterChange(evt.target.dataset.sortType);
  }

  #handleActiveClassChange = (evt) => {
    const allSortButtons = document.querySelectorAll('.sort__button');
    allSortButtons.forEach((element) => {
      element.classList.remove('sort__button--active');
    });
    evt.target.classList.add('sort__button--active');
  }
}
