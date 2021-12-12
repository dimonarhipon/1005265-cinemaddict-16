import {createElement} from '../render.js';

const createFilmsListTemplate = () => `<section class="films-list">
  <h2 class="films-list__title visually-hidden"></h2>
</section>`;

export default class FilmsListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template)
    }

    return this.#element
  }

  get template() {
    return createFilmsListTemplate();
  }

  removeElement() {
    return this.#element;
  }
};
