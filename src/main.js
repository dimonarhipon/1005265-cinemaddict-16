import ProfileUserView from './view/profile-user-view.js';
import NavigationFilmsView from './view/navigation-films-view';
import FilterFilmsView from './view/filter-films-view';
import FilmsBoardView from './view/films-board-view';
import FilmsListView from './view/films-list-view';
import FilmsContainerView from './view/films-container-view';
import CountFilmsView from './view/count-films-view';
import CardView from './view/card-view.js';
import ButtonShowMoreView from './view/button-more-view';
import FilmDetailsView from './view/film-details-view';
import NoFilmView from './view/no-film-view';
import {render, RenderPosition} from './render';
import {generageMovie, generageCountMovie} from './mock/movie';

const CARD_COUNT = 20;
const CARD_COUNT_PER_STEP = 5;

const movieData = Array.from({length: CARD_COUNT}, generageMovie);
const countMovie = generageCountMovie();
const header = document.querySelector('.header');
const mainContent = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

render(header, new ProfileUserView().element, RenderPosition.BEFOREEND);

const renderCard = (filmsContainers, movieInfo) => {
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
};

const renderBoard = (main, movie) => {
  render(main, new NavigationFilmsView().element, RenderPosition.BEFOREEND);
  render(main, new FilterFilmsView().element, RenderPosition.BEFOREEND);
  const boardComponent = new FilmsBoardView();
  render(main, boardComponent.element, RenderPosition.BEFOREEND);
  const filmsListComponent = new FilmsListView();
  const filmsContainerComponent = new FilmsContainerView();

  if (movie.length === 0) {
    render(boardComponent.element, new NoFilmView().element, RenderPosition.AFTERBEGIN);
    return;
  }

  render(boardComponent.element, filmsListComponent.element, RenderPosition.BEFOREEND);
  render(filmsListComponent.element, filmsContainerComponent.element, RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(movie.length, CARD_COUNT_PER_STEP); i++) {
    renderCard(filmsContainerComponent.element, movie[i]);
  }

  if (movie.length > CARD_COUNT_PER_STEP) {
    let renderedMovieCount = CARD_COUNT_PER_STEP;
    const loadMoreButtonComponent = new ButtonShowMoreView();

    render(filmsContainerComponent.element, loadMoreButtonComponent.element, RenderPosition.AFTEREND);

    loadMoreButtonComponent.setClickHandler(() => {
      movie
        .slice(renderedMovieCount, renderedMovieCount + CARD_COUNT_PER_STEP)
        .forEach((elem) => renderCard(filmsContainerComponent.element, elem));

      renderedMovieCount += CARD_COUNT_PER_STEP;

      if (renderedMovieCount >= movie.length) {
        loadMoreButtonComponent.element.remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
};

renderBoard(mainContent, movieData);
render(footerStats, new CountFilmsView(countMovie).element, RenderPosition.BEFOREEND);

