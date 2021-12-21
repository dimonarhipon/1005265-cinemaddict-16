import AbstractView from './abstract-view';

const createFilmsContainer = () => '<div class="films-list__container"></div>';

export default class FilmsContainerView extends AbstractView {
  get template() {
    return createFilmsContainer();
  }
}
