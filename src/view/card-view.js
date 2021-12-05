import dayjs from "dayjs";

export const createCard = (movie) => {
  const {title, total_rating, poster, description, genre, release, runtime} = movie.film_info;

  const comments = movie.comments;

  const ratingScore = (total_rating) => {
    if (total_rating === 0 || total_rating === null) {
      return "";
    } 
    if (total_rating < 5) {
      return "poor";
    }
    if (5 < total_rating && total_rating < 7) {
      return "average";
    }
    if (total_rating >= 7) {
      return "good";
    }
  };

  const durationMovie = (runtime) => {
    const hours = dayjs(runtime).format("h");
    const minute = dayjs(runtime).format("m");
    return `${hours}h ${minute === 0 ? "" : minute}m`;
  };

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating film-card__rating--${ratingScore(total_rating)}">
        ${total_rating === 0 || total_rating === null ? "" : total_rating}
      </p>
      <p class="film-card__info">
        <span class="film-card__year">
          ${release.date}
        </span>
        <span class="film-card__duration">
          ${durationMovie(runtime)}
        </span>
        <span class="film-card__genre">
          ${genre}
        </span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">
        ${description}
        </p>
      <span class="film-card__comments">
        ${comments.length} comment${comments.length === 1 ? "" : "s"}
      </span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
