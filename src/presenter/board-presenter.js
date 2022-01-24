import NavigationFilmsView from '../view/navigation-films-view';
import FilterFilmsView from '../view/filter-films-view';
import FilmsBoardView from '../view/films-board-view';
import FilmsListView from '../view/films-list-view';
import FilmsContainerView from '../view/films-container-view';
import CardPresenter from '../presenter/card-presenter';
import ButtonShowMoreView from '../view/button-more-view';
import NoFilmView from '../view/no-film-view';
import {remove, render, RenderPosition, updateItem} from '../utils';
import {SortType} from '../const.js';
import {sortFilmsByRating, sortFilmsByDate} from '../utils';

const CARD_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #boardContainer = null;
  #filmsModel = null;

  #navigationFilms = new NavigationFilmsView();
  #filterFilms = new FilterFilmsView();
  #boardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();
  #buttonShowMoreView = new ButtonShowMoreView();
  #noFilmsComponent = new NoFilmView();

  #dataFilms = [];
  #renderedMovieCount = CARD_COUNT_PER_STEP;
  #cardPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardCards = [];

  constructor(boardContainer, filmsModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
  }

  init = (dataFilms) => {
    this.#dataFilms = [...dataFilms];
    this.#sourcedBoardCards = [...dataFilms];

    render(this.#boardContainer, this.#navigationFilms, RenderPosition.BEFOREEND);
    render(this.#boardContainer, this.#filterFilms, RenderPosition.BEFOREEND);
    render(this.#boardContainer, this.#boardComponent, RenderPosition.BEFOREEND);

    this.#filterFilms.setFilterClickHandler(this.#handleFilterFilms);

    this.#renderBoard();
  }

  get films() {
    return this.#filmsModel.films;
  }

  #sortCards = (sortType) => {
    switch (sortType) {
      case SortType.RATING:
        this.#dataFilms.sort(sortFilmsByRating);
        break;
      case SortType.DATE:
        this.#dataFilms.sort(sortFilmsByDate);
        break;
      default:
        this.#dataFilms = [...this.#sourcedBoardCards];
    }

    this.#currentSortType = sortType;
  }

  #handleFilterFilms = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortCards(sortType);
    this.#clearCardList();
    this.#renderCardList();
  }

  #renderFilmsListComponent = () => {
    render(this.#boardComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsContainerComponent = () => {
    render(this.#filmsListComponent, this.#filmsContainerComponent, RenderPosition.BEFOREEND);
  }

  #handleButtonShowMoreClick = () => {
    this.#dataFilms
      .slice(this.#renderedMovieCount, this.#renderedMovieCount + this.#renderedMovieCount)
      .forEach((elem) => this.#renderCard(this.#filmsContainerComponent, elem));

    this.#renderedMovieCount += this.#renderedMovieCount;

    if (this.#renderedMovieCount >= this.#dataFilms.length) {
      remove(this.#buttonShowMoreView);
    }
  }

  #renderButtonShowMore = () => {
    render(this.#filmsContainerComponent, this.#buttonShowMoreView, RenderPosition.AFTEREND);

    this.#buttonShowMoreView.setClickHandler(this.#handleButtonShowMoreClick);
  }

  #renderNoFilmsComponent = () => {
    render(this.#boardComponent, this.#noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  #renderCardList = () => {
    this.#renderFilmsListComponent();
    this.#renderFilmsContainerComponent();

    for (let i = 0; i < Math.min(this.#dataFilms.length, this.#renderedMovieCount); i++) {
      this.#renderCard(this.#filmsContainerComponent, this.#dataFilms[i]);
    }
    if (this.#dataFilms.length > this.#renderedMovieCount) {
      this.#renderButtonShowMore();
    }
  }

  #handleCardChange = (updatedCard) => {
    this.#dataFilms = updateItem(this.#dataFilms, updatedCard);
    this.#sourcedBoardCards = updateItem(this.#sourcedBoardCards, updatedCard);
    this.#cardPresenter.get(updatedCard.id).init(updatedCard);
  }

  #renderCard = (filmsContainers, movieInfo) => {
    const cardPresenter = new CardPresenter(filmsContainers, this.#handleCardChange);
    cardPresenter.init(movieInfo);

    this.#cardPresenter.set(movieInfo.id, cardPresenter);
  }

  #clearCardList = () => {
    this.#cardPresenter.forEach((presenter) => presenter.destroy());
    this.#cardPresenter.clear();
    // this.#renderedMovieCount = TASK_COUNT_PER_STEP;
    remove(this.#buttonShowMoreView);
  }

  #renderBoard = () => {
    if (this.#dataFilms.length === 0) {
      this.#renderNoFilmsComponent();
      return;
    }

    this.#renderCardList();
  }
}
