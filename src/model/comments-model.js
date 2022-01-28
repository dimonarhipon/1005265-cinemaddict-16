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
    // console.log(film, comment);
    const index = film.comments.findIndex((elem) => elem.id === comment.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    const commentArray = [...this.#filmComments];
    const commentArray2 = commentArray.map((comments) => {
      comments.filter((elem) => {
        elem.id !== comment.id
        // console.log(elem.id);
      });
      // console.log(comments);
    });
    console.log(commentArray);

    this.#filmComments = [
      ...this.#filmComments.slice(0, index),
      ...this.#filmComments.slice(index + 1),
    ];

    this._notify(updateType, film);
  }
}
