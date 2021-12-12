import {createElement} from '../render.js';

const createFilmsContainer = () => '<div class="films-list__container"></div>';

export default class FilmsContainerView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsContainer();
  }

  removeElement() {
    this.#element = null;
  }
}
