import {createProfileUser} from './view/profile-user-view.js';
import {createNavigationFilms} from './view/navigation-films-view';
import {createFilterFilms} from './view/filter-films-view';
import {createFilmsContent} from './view/films-content-view';
import {createCountFilms} from './view/count-films-view';
import {createCard} from './view/card-view.js';
import {createButtonShowMore} from './view/button-more-view.js';
import {createFilmDetails} from './view/film-details-view';
import {renderTemplate, RenderPosition} from './render';
import {generageMovie, generageCountMovie } from './mock/movie.js';

const CARD_COUNT = 20;
const CARD_COUNT_PER_STEP = 5;

const movie = Array.from({length: CARD_COUNT}, generageMovie);
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');


renderTemplate(header, createProfileUser(), RenderPosition.BEFOREEND);
renderTemplate(main, createNavigationFilms(), RenderPosition.BEFOREEND);
renderTemplate(main, createFilterFilms(), RenderPosition.BEFOREEND);
renderTemplate(main, createFilmsContent(), RenderPosition.BEFOREEND);

const filmWrapper = main.querySelector('.films');
const filmsContainers = [].slice.call(filmWrapper.querySelectorAll('.films-list__container'));

for (let i = 0; i < Math.min(movie.length, CARD_COUNT_PER_STEP); i++) {
  renderTemplate(filmsContainers[0], createCard(movie[i]), RenderPosition.BEFOREEND);
}

if (movie.length > CARD_COUNT_PER_STEP) {
  let renderedMovieCount = CARD_COUNT_PER_STEP;

  renderTemplate(filmsContainers[0], createButtonShowMore(), RenderPosition.AFTEREND);

  const loadMoreButton = filmWrapper.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    movie
      .slice(renderedMovieCount, renderedMovieCount + CARD_COUNT_PER_STEP)
      .forEach((elem) => renderTemplate(filmsContainers[0], createCard(elem), RenderPosition.BEFOREEND));

    renderedMovieCount += CARD_COUNT_PER_STEP;

    if (renderedMovieCount >= movie.length) {
      loadMoreButton.remove();
    }
  });
}

renderTemplate(footerStats, createCountFilms(generageCountMovie()), RenderPosition.BEFOREEND);
// popup
renderTemplate(main, createFilmDetails(movie[0]), RenderPosition.BEFOREEND);
