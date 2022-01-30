import AbstractObservable from '../utils';

export default class CommentsModel extends AbstractObservable {
  #filmComments = [];

  set filmComments(comments) {
    this.#filmComments = [...comments];
  }

  get filmComments() {
    return this.#filmComments;
  }

  addElement = (updateType, film, comment) => {
    this.#filmComments = [
      comment,
      ...this.#filmComments,
    ];

    this._notify(updateType, film);
  }

  deleteElement = (updateType, film, comment) => {
    const index = film.comments.findIndex((elem) => elem.id === comment.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#filmComments = [...this.#filmComments].filter((elem) => elem.id !== comment.id);

    this.#filmComments = [
      ...this.#filmComments
    ];

    this._notify(updateType, film);
  }
}
