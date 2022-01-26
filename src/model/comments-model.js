import AbstractObservable from '../utils';

export default class CommentsModel extends AbstractObservable {
  #comments = [];

  setfilmsCommenes(comments) {
    this.#comments = [...comments];
  }

  get filmsComments() {
    return this.#comments;
  }

  addElement = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  }

  deleteElement = (updateType, update) => {
    const index = this.#comments.findIndex((elem) => elem.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
