import AbstractView from './abstract-view';

const createFilmsBoard = () => '<section class="films"></section>';

export default class FilmsBoardView extends AbstractView {
  get template() {
    return createFilmsBoard();
  }
}
