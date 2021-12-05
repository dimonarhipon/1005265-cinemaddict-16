import {createProfileUser} from './view/profile-user-view.js';
import {createNavigationFilms} from './view/navigation-films-view';
import {createFilterFilms} from './view/filter-films-view';
import {createFilmsContent} from './view/films-content-view';
import {createCountFilms} from './view/count-films-view';
import {createCard} from './view/card-view.js';
import { createButtonShowMore } from './view/button-more-view.js';
import {renderTemplate, RenderPosition} from './render';
import { generageMovie } from './mock/movie.js';

const CARD_COUNT = 20;


const movie = Array.from({length: CARD_COUNT}, generageMovie);
console.log(movie)


const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');


renderTemplate(header, createProfileUser(), RenderPosition.BEFOREEND);
renderTemplate(main, createNavigationFilms(), RenderPosition.BEFOREEND);
renderTemplate(main, createFilterFilms(), RenderPosition.BEFOREEND);
renderTemplate(main, createFilmsContent(), RenderPosition.BEFOREEND);

const filmWrapper = main.querySelector('.films');
const filmsContainers = [].slice.call(filmWrapper.querySelectorAll('.films-list__container'));

/*
Далее перепишем код в main.js для работы с моковыми данными. На основе первого по порядку элемента в массиве отрисуйте компонент «Подробная информация о фильме (попап)», а на основе первых 5 из всех элементов отрисуйте компонент «Карточка фильма».

В заключение реализуем показ оставшихся фильмов. Для этого напишите функцию, которая будет отрисовывать ещё по 5 компонентов «Карточка фильма» (или меньше, смотрите ограничения в техническом задании) при клике на кнопку Show more и скрывать саму кнопку, когда больше отрисовывать будет нечего.
*/

for (let i = 0; i < CARD_COUNT; i++) {
  renderTemplate(filmsContainers[0], createCard(movie[i]), RenderPosition.BEFOREEND);
}

// filmsContainers.forEach((container) => {
//   for (let i = 0; i < CARD_COUNT; i++) {
//     renderTemplate(container, createCard(movie[i]), RenderPosition.BEFOREEND);
//   }
// });

renderTemplate(filmsContainers[0], createButtonShowMore(), RenderPosition.AFTEREND);
renderTemplate(footerStats, createCountFilms(), RenderPosition.BEFOREEND);
