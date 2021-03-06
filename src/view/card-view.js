import AbstractView from './abstract-view';
import dayjs from 'dayjs';

const createCard = (movie, comments) => {
  const {title, totalRating, poster, description, genre, release, runtime} = movie.filmInfo;
  const {isWatch, isWatched, isFavorite} = movie.userDetails;

  // const comments = comments.comments;


  const ratingScore = (rating) => {
    if (rating === 0 || rating === null) {
      return '';
    }
    if (rating < 5) {
      return 'poor';
    }
    if (5 < rating && rating < 7) {
      return 'average';
    }
    if (rating >= 7) {
      return 'good';
    }
  };

  const durationMovie = (item) => {
    const hours = dayjs(item).format('h');
    const minute = dayjs(item).format('m');
    return `${hours}h ${minute === 0 ? '' : minute}m`;
  };

  const watchClassName = isWatch
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';

  const favoriteClassName = isFavorite
    ? 'film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item--favorite';

  const watchedClassName = isWatched
    ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item--mark-as-watched';

  return `<article class='film-card'>
    <a class='film-card__link'>
      <h3 class='film-card__title'>${title}</h3>
      <p class='film-card__rating film-card__rating--${ratingScore(totalRating)}'>
        ${totalRating === 0 || totalRating === null ? '' : totalRating}
      </p>
      <p class='film-card__info'>
        <span class='film-card__year'>
          ${release.date}
        </span>
        <span class='film-card__duration'>
          ${durationMovie(runtime)}
        </span>
        <span class='film-card__genre'>
          ${genre}
        </span>
      </p>
      <img src=${poster} alt='' class='film-card__poster'>
      <p class='film-card__description'>
        ${description}
        </p>
      <span class='film-card__comments'>
        ${comments.length} comment${comments.length === 1 ? '' : 's'}
      </span>
    </a>
    <div class='film-card__controls'>
      <button class='film-card__controls-item ${watchClassName}' type='button'>Add to watchlist</button>
      <button class='film-card__controls-item ${watchedClassName}' type='button'>Mark as watched</button>
      <button class='film-card__controls-item ${favoriteClassName}' type='button'>Mark as favorite</button>
    </div>
  </article>`;
};

export default class CardView extends AbstractView {
  #movie = null;
  #comments = null;

  constructor(movie, comments) {
    super();
    this.#movie = movie;
    this.#comments = comments;
  }

  get template() {
    return createCard(this.#movie, this.#comments);
  }

  setOpenClickHandler = (callback) => {
    this._callback.openClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#openClickHandler);
  }

  #openClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.openClick();
  }

  #controlWatchClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.controlWatchClick();
  }

  setControlWatch = (callback) => {
    this._callback.controlWatchClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#controlWatchClickHandler);
  };

  #controlFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.controlFavoriteClick();
  }

  setControlFavorite = (callback) => {
    this._callback.controlFavoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#controlFavoriteClickHandler);
  };

  #controlWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.controlWatchedClick();
  }

  setControlWatched = (callback) => {
    this._callback.controlWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#controlWatchedClickHandler);
  };
}
