import ProfileUserView from '../view/profile-user-view';
import NavigationFilmsView from '../view/navigation-films-view';
import {RenderPosition, render, remove, replace} from '../utils';
import {filter} from '../utils';
import {UpdateType, FilterType} from '../const';

export default class FilterPresenter {
  #headerContainer = null;
  #mainContainer = null;

  #filterModel = null;
  #filmsModel = null;

  #filterComponent = null;
  #profileComponent = null;

  constructor(headerContainer, mainContainer, filterModel, filmsModel) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    const prevProfileComponent = this.#profileComponent;

    this.#profileComponent = new ProfileUserView(filters);

    if (prevProfileComponent === null) {
      render(this.#headerContainer, this.#profileComponent, RenderPosition.BEFOREEND);
    } else {
      replace(this.#profileComponent, prevProfileComponent);
      remove(prevProfileComponent);
    }

    this.#filterComponent = new NavigationFilmsView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterClickHandler(this.#handleFilmsFilter);

    if (prevFilterComponent === null) {
      render(this.#mainContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  get filters() {
    const films = this.#filmsModel.films.map((film) => film.userDetails);
    // console.log(films);

    return [{
      type: FilterType.ALL,
      name: 'All movies',
      count: filter[FilterType.ALL](films).length,
    },
    {
      type: FilterType.WATCHLIST,
      name: 'Watchlist',
      count: filter[FilterType.WATCHLIST](films).length,
    },
    {
      type: FilterType.HISTORY,
      name: 'History',
      count: filter[FilterType.HISTORY](films).length,
    },
    {
      type: FilterType.FAVORITES,
      name: 'Favorites',
      count: filter[FilterType.FAVORITES](films).length,
    }];
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilmsFilter = (filterType) => {
    if (this.#filterModel.filmsFilter === filterType) {
      return;
    }
    this.#filterModel.setFilmsFilter(UpdateType.MAJOR, filterType);
  }
}
