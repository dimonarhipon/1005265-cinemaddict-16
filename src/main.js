import CountFilmsView from './view/count-films-view';
import BoardPresenter from './presenter/board-presenter.js';
import {render, RenderPosition} from './utils.js';
import {generageMovie, generageCountMovie} from './mock/movie';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';

const CARD_COUNT = 20;

const movieData = Array.from({length: CARD_COUNT}, generageMovie);
const countMovie = generageCountMovie();
const filmsModel = new FilmsModel();
filmsModel.films = movieData;

const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

const comments = movieData.map((item) => item.comments);
commentsModel.filmComments = comments;

const header = document.querySelector('.header');
const mainContent = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

const filterPresenter = new FilterPresenter(header, mainContent, filterModel, filmsModel);
filterPresenter.init();

const boardPresenter = new BoardPresenter(mainContent, filterModel, filmsModel, commentsModel);

boardPresenter.init();
render(footerStats, new CountFilmsView(countMovie).element, RenderPosition.BEFOREEND);

