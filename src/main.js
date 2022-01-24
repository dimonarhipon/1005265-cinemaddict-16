import ProfileUserView from './view/profile-user-view.js';
import CountFilmsView from './view/count-films-view';
import BoardPresenter from './presenter/board-presenter.js';
import {render, RenderPosition} from './utils.js';
import {generageMovie, generageCountMovie} from './mock/movie';
import FilmsModel from './model/films-model';

const CARD_COUNT = 20;

const movieData = Array.from({length: CARD_COUNT}, generageMovie);
const countMovie = generageCountMovie();
const filmsModel = new FilmsModel();

const header = document.querySelector('.header');
const mainContent = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

const boardPresenter = new BoardPresenter(mainContent, filmsModel);

render(header, new ProfileUserView().element, RenderPosition.BEFOREEND);
boardPresenter.init(movieData);
render(footerStats, new CountFilmsView(countMovie).element, RenderPosition.BEFOREEND);

