import ProfileUserView from './view/profile-user-view.js';
import NavigationFilmsView from './view/navigation-films-view';
import FilterFilmsView from './view/filter-films-view';
import FilmsBoardView from './view/films-board-view';
import FilmsListView from './view/films-list-view';
import FilmsContainerView from './view/films-container-view';
import CountFilmsView from './view/count-films-view';
import CardView from './view/card-view.js';
import ButtonShowMoreView from './view/button-more-view.js';
import FilmDetailsView from './view/film-details-view';
import {createComment} from './view/comment-details-view';
import {render, RenderPosition} from './render';
import {generageMovie, generageCountMovie} from './mock/movie.js';

const CARD_COUNT = 20;
const CARD_COUNT_PER_STEP = 5;

const movie = Array.from({length: CARD_COUNT}, generageMovie);
const countMovie = generageCountMovie();
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');


render(header, new ProfileUserView().element, RenderPosition.BEFOREEND);
render(main, new NavigationFilmsView().element, RenderPosition.BEFOREEND);
render(main, new FilterFilmsView().element, RenderPosition.BEFOREEND);
const boardComponent = new FilmsBoardView();
render(main, boardComponent.element, RenderPosition.BEFOREEND);
const filmsListComponent = new FilmsListView();
const filmsContainerComponent = new FilmsContainerView();

render(boardComponent.element, filmsListComponent.element, RenderPosition.BEFOREEND);
render(filmsListComponent.element, filmsContainerComponent.element, RenderPosition.BEFOREEND);

const renderCard = (filmsContainers, movie) => {
  const cardComponent = new CardView(movie);
  const popupComponent = new FilmDetailsView(movie);


  const buttonOpenPopup = cardComponent.element.querySelector('.film-card__link');
  const buttonClosePopup = popupComponent.element.querySelector('.film-details__close-btn');

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopupHandler();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const openPopupHandler = () => {
    filmsContainers.appendChild(popupComponent.element);
    document.addEventListener('keydown', onEscKeyDown);
  };

  const closePopupHandler = () => {
    filmsContainers.removeChild(popupComponent.element);
    buttonClosePopup.removeEventListener('click', closePopupHandler);
    document.querySelector('body').classList.remove('hide-overflow');
  };

  buttonOpenPopup.addEventListener('click', () => {
    openPopupHandler();
    document.addEventListener('keydown', onEscKeyDown);
    document.querySelector('body').classList.add('hide-overflow');
  });

  buttonClosePopup.addEventListener('click', closePopupHandler);
  render(filmsContainers, cardComponent.element, RenderPosition.BEFOREEND);
};

for (let i = 0; i < Math.min(movie.length, CARD_COUNT_PER_STEP); i++) {
  renderCard(filmsContainerComponent.element, movie[i]);
}

if (movie.length > CARD_COUNT_PER_STEP) {
  let renderedMovieCount = CARD_COUNT_PER_STEP;
  const loadMoreButtonComponent = new ButtonShowMoreView();

  render(filmsContainerComponent.element, new ButtonShowMoreView().element, RenderPosition.AFTEREND);


  loadMoreButtonComponent.element.addEventListener('click', (evt) => {
    evt.preventDefault(); 
    console.log(evt);

    movie
      .slice(renderedMovieCount, renderedMovieCount + CARD_COUNT_PER_STEP)
      .forEach((elem) => render(filmsContainerComponent.element, elem));

    renderedMovieCount += CARD_COUNT_PER_STEP;

    if (renderedMovieCount >= movie.length) {
      loadMoreButtonComponent.remove();
    }
  });
}

render(footerStats, new CountFilmsView(countMovie).element, RenderPosition.BEFOREEND);

