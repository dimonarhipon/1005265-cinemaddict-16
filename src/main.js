import {createProfileUser} from './view/profile-user-view.js';
import {createNavigationFilms} from './view/navigation-films-view';
import {createFilterFilms} from './view/filter-films-view';
import {createFilmsContent} from './view/films-content-view';
import {createCountFilms} from './view/count-films-view';
import {createCard} from './view/card-view.js';
import { createButtonShowMore } from './view/button-more-view.js';
import {renderTemplate, RenderPosition} from './render';

const CARD_COUNT = 5;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');


renderTemplate(header, createProfileUser(), RenderPosition.BEFOREEND);
renderTemplate(main, createNavigationFilms(), RenderPosition.BEFOREEND);
renderTemplate(main, createFilterFilms(), RenderPosition.BEFOREEND);
renderTemplate(main, createFilmsContent(), RenderPosition.BEFOREEND);

const filmWrapper = main.querySelector('.films');
const filmsContainers = [].slice.call(filmWrapper.querySelectorAll('.films-list__container'));

filmsContainers.forEach(container => {
  for (let i = 0; i < CARD_COUNT; i++) {
    renderTemplate(container, createCard(), RenderPosition.BEFOREEND);
  }
})

renderTemplate(filmsContainers[0], createButtonShowMore(), RenderPosition.AFTEREND);
renderTemplate(footerStats, createCountFilms(), RenderPosition.BEFOREEND);
