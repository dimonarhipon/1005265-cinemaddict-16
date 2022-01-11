import AbstractView from './abstract-view';
import dayjs from 'dayjs';

const createFilmDetails = (movie) => {
  const {title, alternativeTitle, totalRating, poster, ageRating, director, writers, actors, description, genre, release, runtime} = movie.filmInfo;
  const {isWatch, isWatched, isFavorite} = movie.userDetails;
  const comments = movie.comments;

  const durationMovie = (item) => {
    const hours = dayjs(item).format('h');
    const minute = dayjs(item).format('m');
    return `${hours}h ${minute === 0 ? '' : minute}m`;
  };

  const releaseMovie = (date) => {
    const realeaseDate = dayjs(date).format('D MMMM YYYY');
    return realeaseDate;
  };

  const watchClassName = isWatch
    ? 'film-details__control-button--watchlist film-details__control-button--active'
    : 'film-details__control-button--watchlist';

  const favoriteClassName = isFavorite
    ? 'film-details__control-button--favorite film-details__control-button--active'
    : 'film-details__control-button--favorite';

  const watchedClassName = isWatched
    ? 'film-details__control-button--watched film-details__control-button--active'
    : 'film-details__control-button--watched';

  return `<section class='film-details'>
    <form class='film-details__inner' action='' method='get'>
      <div class='film-details__top-container'>
        <div class='film-details__close'>
          <button class='film-details__close-btn' type='button'>close</button>
        </div>
        <div class='film-details__info-wrap'>
          <div class='film-details__poster'>
            <img class='film-details__poster-img' src='${poster}' alt=''>

            <p class='film-details__age'>${ageRating}+</p>
          </div>

          <div class='film-details__info'>
            <div class='film-details__info-head'>
              <div class='film-details__title-wrap'>
                <h3 class='film-details__title'>${title}</h3>
                <p class='film-details__title-original'>Original: ${alternativeTitle}</p>
              </div>

              <div class='film-details__rating'>
                <p class='film-details__total-rating'>
                  ${totalRating === 0 || totalRating === null ? '' : totalRating}
                </p>
              </div>
            </div>

            <table class='film-details__table'>
              <tr class='film-details__row'>
                <td class='film-details__term'>Director</td>
                <td class='film-details__cell'>${director}</td>
              </tr>
              <tr class='film-details__row'>
                <td class='film-details__term'>Writers</td>
                <td class='film-details__cell'>${writers}</td>
              </tr>
              <tr class='film-details__row'>
                <td class='film-details__term'>Actors</td>
                <td class='film-details__cell'>${actors}</td>
              </tr>
              <tr class='film-details__row'>
                <td class='film-details__term'>Release Date</td>
                <td class='film-details__cell'>
                  ${releaseMovie(release.date)}
                </td>
              </tr>
              <tr class='film-details__row'>
                <td class='film-details__term'>Runtime</td>
                <td class='film-details__cell'>${durationMovie(runtime)}</td>
              </tr>
              <tr class='film-details__row'>
                <td class='film-details__term'>Country</td>
                <td class='film-details__cell'>${release.release_country}</td>
              </tr>
              <tr class='film-details__row'>
                <td class='film-details__term'>Genres</td>
                <td class='film-details__cell'>
                  <span class='film-details__genre'>${genre}</span>
                </td>
              </tr>
            </table>

            <p class='film-details__film-description'>
              ${description}
            </p>
          </div>
        </div>

        <section class='film-details__controls'>
          <button type='button' class='film-details__control-button ${watchClassName}' id='watchlist' name='watchlist'>Add to watchlist</button>
          <button type='button' class='film-details__control-button ${watchedClassName}' id='watched' name='watched'>Already watched</button>
          <button type='button' class='film-details__control-button ${favoriteClassName}' id='favorite' name='favorite'>Add to favorites</button>
        </section>
      </div>

      <div class='film-details__bottom-container'>
        <section class='film-details__comments-wrap'>
          <h3 class='film-details__comments-title'>
            Comment${comments.length === 1 ? '' : 's'} 
            <span class='film-details__comments-count'>${comments.length}</span></h3>

          <ul class='film-details__comments-list'>
            
          </ul>

          <div class='film-details__new-comment'>
            <div class='film-details__add-emoji-label'></div>

            <label class='film-details__comment-label'>
              <textarea class='film-details__comment-input' placeholder='Select reaction below and write comment here' name='comment'></textarea>
            </label>

            <div class='film-details__emoji-list'>
              <input class='film-details__emoji-item visually-hidden' name='comment-emoji' type='radio' id='emoji-smile' value='smile'>
              <label class='film-details__emoji-label' for='emoji-smile'>
                <img src='./images/emoji/smile.png' width='30' height='30' alt='emoji'>
              </label>

              <input class='film-details__emoji-item visually-hidden' name='comment-emoji' type='radio' id='emoji-sleeping' value='sleeping'>
              <label class='film-details__emoji-label' for='emoji-sleeping'>
                <img src='./images/emoji/sleeping.png' width='30' height='30' alt='emoji'>
              </label>

              <input class='film-details__emoji-item visually-hidden' name='comment-emoji' type='radio' id='emoji-puke' value='puke'>
              <label class='film-details__emoji-label' for='emoji-puke'>
                <img src='./images/emoji/puke.png' width='30' height='30' alt='emoji'>
              </label>

              <input class='film-details__emoji-item visually-hidden' name='comment-emoji' type='radio' id='emoji-angry' value='angry'>
              <label class='film-details__emoji-label' for='emoji-angry'>
                <img src='./images/emoji/angry.png' width='30' height='30' alt='emoji'>
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmDetailsView extends AbstractView {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createFilmDetails(this.#movie);
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  }

  #controlWatchClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.controlWatchClick();
  }

  setControlWatch = (callback) => {
    this._callback.controlWatchClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#controlWatchClickHandler);
  };

  #controlFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.controlFavoriteClick();
  }

  setControlFavorite = (callback) => {
    this._callback.controlFavoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#controlFavoriteClickHandler);
  };

  #controlWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.controlWatchedClick();
  }

  setControlWatched = (callback) => {
    this._callback.controlWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#controlWatchedClickHandler);
  };
}
