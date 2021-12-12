import {createElement} from '../render.js';

const createFilmsBoard = () => `<section class="films"></section>`;

export default class FilmsBoardView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template)
    }

    return this.#element
  }

  get template() {
    return createFilmsBoard();
  }

  removeElement() {
    return this.#element;
  }
};
