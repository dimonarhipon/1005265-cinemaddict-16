import AbstractView from './abstract-view';
import {FilterType} from '../const';

const createNavigationFilms = (filters, currentFilterType) => {
  const findFilter = (name, array) => array.find((element) => element.name === name);

  const history = findFilter('History', filters);
  const watchlist = findFilter('Watchlist', filters);
  const favorites = findFilter('Favorites', filters);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all"
        class="main-navigation__item ${currentFilterType === FilterType.ALL ? 'main-navigation__item--active': ''}"
        data-filter-type="${FilterType.ALL}">
          All movies
      </a>
      <a href="#watchlist"
        class="main-navigation__item ${currentFilterType === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}"
        data-filter-type="${FilterType.WATCHLIST}">
          Watchlist <span class="main-navigation__item-count">${watchlist.count}</span>
      </a>
      <a href="#history"
        class="main-navigation__item ${currentFilterType === FilterType.HISTORY ? 'main-navigation__item--active' : ''}"
        data-filter-type="${FilterType.HISTORY}">
          History <span class="main-navigation__item-count">${history.count}</span>
      </a>
      <a href="#favorites"
        class="main-navigation__item ${currentFilterType === FilterType.FAVORITES ? 'main-navigation__item--active' : ''}"
        data-filter-type="${FilterType.FAVORITES}">Favorites <span class="main-navigation__item-count">${favorites.count}</span>
      </a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class NavigationFilmsView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createNavigationFilms(this.#filters, this.#currentFilter);
  }

  setFilterClickHandler = (callback) => {
    this._callback.filmsFilterClick = callback;
    this.element.addEventListener('click', this.#filterClickHandler);
  }

  #filterClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmsFilterClick(evt.target.dataset.filterType);
  }
}
