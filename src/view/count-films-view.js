import AbstractView from './abstract-view';

const createCountFilms = (count) => `<p>${count} movies inside</p>`;

export default class CountFilmsView extends AbstractView {
  #count = null;

  constructor(count) {
    super();
    this.#count = count;
  }

  get template() {
    return createCountFilms(this.#count);
  }
}
