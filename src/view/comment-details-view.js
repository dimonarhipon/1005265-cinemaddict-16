import dayjs from 'dayjs';

export const createComment = (message = []) => {
  const {author = 'mike', comment = 'norm', date, emotion = 'sleeping'} = message;
  const releaseMovie = (item) => {
    const realeaseDate = dayjs(item).format('YYYY/MM/DD/hh:mm');
    return realeaseDate;
  };

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${releaseMovie(date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};
