import SortFilmsView from '../view/sort-films-view';
import FilmsBoardView from '../view/films-board-view';
import FilmsListView from '../view/films-list-view';
import FilmsContainerView from '../view/films-container-view';
import CardPresenter from '../presenter/card-presenter';
import ButtonShowMoreView from '../view/button-more-view';
import NoFilmView from '../view/no-film-view';
import {remove, render, RenderPosition} from '../utils';
import {filter} from '../utils';
import {FilterType, SortType, UpdateType, UserAction} from '../const.js';
import {sortFilmsByRating, sortFilmsByDate} from '../utils';

const CARD_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #boardContainer = null;
  #filterModel = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmsSortComponent = null;
  #boardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();
  #buttonShowMoreView = new ButtonShowMoreView();
  #noFilmsComponent = new NoFilmView();

  #renderedMovieCount = CARD_COUNT_PER_STEP;
  #cardPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #currentFilterType = FilterType.ALL;

  constructor(boardContainer, filterModel, filmsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderBoard();
  }

  get films() {
    this.#currentFilterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#currentFilterType](films);

    switch (this.#currentSortType) {
      case SortType.RATING:
        return [...filteredFilms].sort(sortFilmsByRating);
      case SortType.DATE:
        return [...filteredFilms].sort(sortFilmsByDate);
    }

    return filteredFilms;
  }

  get filmsComments() {
    return this.#commentsModel.comments;
  }

  #renderFilmsListComponent = () => {
    render(this.#boardComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsContainerComponent = () => {
    render(this.#filmsListComponent, this.#filmsContainerComponent, RenderPosition.BEFOREEND);
  }

  #handleButtonShowMoreClick = () => {
    const filmCount = this.films.length;

    this.films
      .slice(this.#renderedMovieCount, this.#renderedMovieCount + this.#renderedMovieCount)
      .forEach((elem) => this.#renderCard(this.#filmsContainerComponent, elem));

    this.#renderedMovieCount += this.#renderedMovieCount;

    if (this.#renderedMovieCount >= filmCount) {
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

  #handleViewAction = (actionType, updateType, updateFilm, updateComments) => {
    // console.log(actionType, updateType, updateFilm, updateComments);

    switch (actionType) {
      case UserAction.UPDATE_ELEMENT:
        this.#filmsModel.updateFilm(updateType, updateFilm);
        break;
      case UserAction.ADD_ELEMENT:
        this.#commentsModel.addFilmComment(updateType, updateComments, updateFilm);
        break;
      case UserAction.DELETE_ELEMENT:
        this.#commentsModel.deleteFilmComment(updateType, updateComments, updateFilm);
        this.#filmsModel.updateFilm(updateType, updateFilm);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    const comments = this.filmsComments;

    switch (updateType) {
      case UpdateType.PATCH:
        this.#cardPresenter.get(data.id).init(data, comments);
        break;
      case UpdateType.MINOR:
        this.#clearCardList();
        this.#renderBoard();

        if (this.movieCards.find((card) => card.id === data.id)) {
          this.#cardPresenter.get(data.id);
        }
        break;
      case UpdateType.MAJOR:
        this.#clearCardList();
        this.#renderBoard();
        break;
    }
  }

  #renderCardList = () => {
    const filmCount = this.films.length;

    this.#renderFilmsListComponent();
    this.#renderFilmsContainerComponent();

    for (let i = 0; i < Math.min(filmCount, this.#renderedMovieCount); i++) {
      this.#renderCard(this.#filmsContainerComponent, this.films[i]);
    }
    if (filmCount > this.#renderedMovieCount) {
      this.#renderButtonShowMore();
    }
  }

  #renderCard = (filmsContainers, movieInfo) => {
    const cardPresenter = new CardPresenter(filmsContainers, this.#handleViewAction);
    cardPresenter.init(movieInfo);

    this.#cardPresenter.set(movieInfo.id, cardPresenter);
  }

  #clearCardList = () => {
    this.#cardPresenter.forEach((presenter) => presenter.destroy());
    this.#cardPresenter.clear();
    // this.#renderedMovieCount = TASK_COUNT_PER_STEP;
    remove(this.#buttonShowMoreView);
  }

  #handleSortFilms = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearCardList();
    this.#renderCardList();
  }

  #renderSort = () => {
    this.#filmsSortComponent = new SortFilmsView(this.#currentSortType);
    this.#filmsSortComponent.setSortClickHandler(this.#handleSortFilms);
    render(this.#boardContainer, this.#filmsSortComponent, RenderPosition.BEFOREEND);
  }

  #renderBoard = () => {
    if (this.films.length === 0) {
      this.#renderNoFilmsComponent();
      return;
    }

    this.#renderSort();
    this.#renderCardList();
  }
}
