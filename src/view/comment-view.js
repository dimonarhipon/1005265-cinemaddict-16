import AbstractView from './abstract-view';
import dayjs from 'dayjs';

export const createComment = (comment = []) => {
  const {id, author = 'mike', message = 'norm', date, emotion = 'sleeping'} = comment;

  const releaseMovie = (item) => {
    const realeaseDate = dayjs(item).format('YYYY/MM/DD/hh:mm');
    return realeaseDate;
  };

  return `<li class="film-details__comment" data-comment-id="${id}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${message}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${releaseMovie(date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

export default class CommentView extends AbstractView {
  #comment = null;

  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createComment(this.#comment);
  }
}
