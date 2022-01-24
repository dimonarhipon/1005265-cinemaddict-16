import {createComment} from './comment-view';
import SmartView from './smart-view';
import dayjs from 'dayjs';
import {EMOTIONS} from '../const';

const createPopup = (data) => {
  const {title, alternativeTitle, totalRating, poster, ageRating, director, writers, actors, description, genre, release, runtime} = data.filmInfo;
  const {isWatch, isWatched, isFavorite} = data.userDetails;
  const comments = data.comments;
  const {emotionChecked} = data;

  const commentList = comments.map((comment) => createComment(comment)).join('');

  const descriptionFilm = description.length > 140 ? description.slice(0, 139).concat('...') : description;

  const genresName = genre.length > 1 ? 'Genres' : 'Genre';

  const getGenres = (genresArray) => genresArray.map((genreTemplate) => `<span class="film-details__genre">${genreTemplate}</span>`).join(', ');

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

  const createEmotion = (emoji = 'smile') => `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}"> <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}"></input>`;

  const createEmotionsTemplate = (emoji = 'smile') => `<input
    class="film-details__emoji-item visually-hidden"
    name="comment-emoji"
    type="radio"
    id="emoji-${emoji}"
    value="${emoji}">
  <label class="film-details__emoji-label" for="emoji-${emoji}">
    <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
  </label>`;

  const emotionsTemplate = EMOTIONS.map((emoji) => createEmotionsTemplate(emoji)).join('');

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
                <td class='film-details__term'>${genresName}</td>
                <td class='film-details__cell'>
                  ${getGenres(genre)}
                </td>
              </tr>
            </table>

            <p class='film-details__film-description'>
              ${descriptionFilm}
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
            ${commentList}
          </ul>

          <div class='film-details__new-comment'>
            <div class='film-details__add-emoji-label'>
              ${createEmotion(emotionChecked)}
            </div>

            <label class='film-details__comment-label'>
              <textarea class='film-details__comment-input' placeholder='Select reaction below and write comment here' name='comment'>

              </textarea>
            </label>

            <div class='film-details__emoji-list'>
              ${emotionsTemplate}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class PopupView extends SmartView {
  _scrollPosition = 0;
  #elementScroll;
  #newElementScroll;

  constructor(movie) {
    super();
    this._data = PopupView.parseFilmToData(movie);
    this.setInnerHandlers();
  }

  get template() {
    return createPopup(this._data);
  }

  saveScrollPosition = () => {
    this.#elementScroll = document.querySelector('.film-details');
    this._scrollPosition = this.#elementScroll.scrollTop;
  }

  setScrollposition = () => {
    this.#newElementScroll = document.querySelector('.film-details');
    this.#newElementScroll.scrollTop = this._scrollPosition;
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
    this.saveScrollPosition();
    this._callback.controlWatchClick();
    this.setScrollposition();
  }

  setControlWatch = (callback) => {
    this._callback.controlWatchClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#controlWatchClickHandler);
  };

  #controlFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.saveScrollPosition();
    this._callback.controlFavoriteClick();
    this.setScrollposition();
  }

  setControlFavorite = (callback) => {
    this._callback.controlFavoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#controlFavoriteClickHandler);
  };

  #controlWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this.saveScrollPosition();
    this._callback.controlWatchedClick();
    this.setScrollposition();
  }

  setControlWatched = (callback) => {
    this._callback.controlWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#controlWatchedClickHandler);
  };

  #emotionChangeHandler = (evt) => {
    evt.preventDefault();
    this.saveScrollPosition();
    this.updateData({
      ...this._data,
      emotionChecked: evt.target.value,
    });
    this.setScrollposition();
  }

  reset = (film) => {
    this.updateData(
      PopupView.parseFilmToData(film),
    );
  }

  restoreHandlers = () => {
    this.setInnerHandlers();
    this.setControlWatched(this._callback.controlWatchedClick);
    this.setControlFavorite(this._callback.controlFavoriteClick);
    this.setControlWatch(this._callback.controlWatchClick);
    this.setCloseClickHandler(this._callback.closeClick);
  }

  setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#emotionChangeHandler);
  }

  static parseDataToFilm = (film) => ({
    ...film,
    emotionChecked: ''
  })

  static parseFilmToData = (data) => {
    const film = { ...data };

    delete film.emotionChecked;

    return film;
  }
}
