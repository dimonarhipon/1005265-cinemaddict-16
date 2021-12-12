import {createElement} from '../render.js';

const createCountFilms = (count) => `<p>${count} movies inside</p>`;

export default class CountFilmsView {
  #element = null;
  #count = null;

  constructor(count) {
    this.#count = count;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createCountFilms(this.#count);
  }

  removeElement() {
    this.#element = null;
  }
};
