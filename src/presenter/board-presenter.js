import NavigationFilmsView from '../view/navigation-films-view';
import FilterFilmsView from '../view/filter-films-view';
import FilmsBoardView from '../view/films-board-view';
import FilmsListView from '../view/films-list-view';
import FilmsContainerView from '../view/films-container-view';
import CardView from '../view/card-view.js';
import FilmDetailsView from '../view/film-details-view';
import ButtonShowMoreView from '../view/button-more-view';
import NoFilmView from '../view/no-film-view';
import {render, RenderPosition} from '../render';

const CARD_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #boardContainer = null;

  #navigationFilms = new NavigationFilmsView();
  #filterFilms = new FilterFilmsView();
  #boardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();
  #cardComponent = new CardView();
  #filmDetails = new FilmDetailsView();
  #buttonShowMoreView = new ButtonShowMoreView();
  #noFilmsComponent = new NoFilmView();

  #dataFilms = [];
  #renderedMovieCount = CARD_COUNT_PER_STEP;

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
  }

  init = (dataFilms) => {
    this.#dataFilms = [...dataFilms];

    render(this.#boardContainer, this.#navigationFilms, RenderPosition.BEFOREEND);
    render(this.#boardContainer, this.#filterFilms, RenderPosition.BEFOREEND);
    render(this.#boardContainer, this.#boardComponent, RenderPosition.BEFOREEND);
    // render(this.#boardComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);
    // render(this.#filmsListComponent, this.#filmsContainerComponent, RenderPosition.BEFOREEND);

    this.#renderBoard();
  }

  #renderFilmsListComponent = () => {
    render(this.#boardComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsContainerComponent = () => {
    render(this.#filmsListComponent, this.#filmsContainerComponent, RenderPosition.BEFOREEND);
  }

  #renderButtonShowMore = () => {
    render(this.#filmsContainerComponent, this.#buttonShowMoreView, RenderPosition.AFTEREND);

    this.#buttonShowMoreView.setClickHandler(() => {
      this.#dataFilms
        .slice(this.#renderedMovieCount, this.#renderedMovieCount + CARD_COUNT_PER_STEP)
        .forEach((elem) => this.#renderCard(this.#filmsContainerComponent, elem));

      this.#renderedMovieCount += CARD_COUNT_PER_STEP;

      if (CARD_COUNT_PER_STEP >= this.#dataFilms.length) {
        this.#buttonShowMoreView.remove();
        this.#buttonShowMoreView.removeElement();
      }
    });
  }

  #renderNoFilmsComponent = () => {
    render(this.#boardComponent, this.#noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  #renderCardList = () => {
    if (this.#dataFilms.length > CARD_COUNT_PER_STEP) {
      this.#renderButtonShowMore();
    }
  }

  #renderCard = (filmsContainers, movieInfo) => {
    // const renderCard = (filmsContainers, movieInfo) => {
    const cardComponent = new CardView(movieInfo);
    const popupComponent = new FilmDetailsView(movieInfo);


    const openPopupHandler = () => {
      filmsContainers.appendChild(popupComponent.element);
      document.querySelector('body').classList.add('hide-overflow');
    };

    const closePopupHandler = () => {
      filmsContainers.removeChild(popupComponent.element);
      document.querySelector('body').classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopupHandler();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    cardComponent.setOpenClickHandler(() => {
      openPopupHandler();
      document.addEventListener('keydown', onEscKeyDown);
    });

    popupComponent.setCloseClickHandler(closePopupHandler);
    render(filmsContainers, cardComponent.element, RenderPosition.BEFOREEND);
  }

  #renderBoard = () => {
    if (this.#dataFilms.length === 0) {
      this.#renderNoFilmsComponent();
      return;
    }

    this.#renderFilmsListComponent();
    this.#renderFilmsContainerComponent();

    for (let i = 0; i < Math.min(this.#dataFilms.length, CARD_COUNT_PER_STEP); i++) {
      this.#renderCard(this.#filmsContainerComponent, this.#dataFilms[i]);
    }

    this.#renderCardList();
  }
}
