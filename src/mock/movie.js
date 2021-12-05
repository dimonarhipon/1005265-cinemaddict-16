import { nanoid } from "nanoid";
import { Dayjs } from "dayjs";
import { getRandomInteger } from "../utils";

import { COMMENT_COUNT, EMOTIONS, AUTHORS, COMMENTS_TEXT, TITLS, ALTERNATIVE_TITLS, POSTERS, DESCRIPTIONS_TEXT } from "../const";


const generateDateComment = () => {
  const maxDaysGap = 6;
  const daysGap = getRandomInteger(0, maxDaysGap);

  // const daysGap = getRandomInteger(minDaysGap, maxDaysGap);
  // const timeGap = getRandomInteger(0, maxHoursGap);
  // const minuteGap = getRandomInteger(0, maxMinuteGap);

  // const day = dayjs().add(daysGap, `day`).add(timeGap, `hour`).add(minuteGap, `minutes`).toDate();

  if (daysGap === 0) {
    // 2 days ago
  }

  const date = Dayjs().add(daysGap, 'day').toDate()

  return date;
};

const generateComment = () => ({
  "id": nanoid(),
  "author": getRandomInteger(0, AUTHORS.length - 1),
  "comment": getRandomInteger(0, COMMENTS_TEXT.length - 1),
  // "date": generateDateComment(),
  "emotion": getRandomInteger(0, EMOTIONS.length - 1)
  // "date": "2019-05-11T16:12:32.554Z",
});

const generateComments = () => {
  return Array.from({length: COMMENT_COUNT}, generateComment());
};

const generatePoster = () => {
  return POSTERS[getRandomInteger(0, POSTERS.length - 1)];
};

const generateRating = () => {
  return (Math.ceil(getRandomInteger(1, 100)) * 0.1).toFixed(1);
}

export const generageMovie = () => {
  return {
    "id": nanoid(),
    // "comments": generateComments(),

    "film_info": {
      "title": TITLS[getRandomInteger(0, TITLS.length - 1)],
      "alternative_title": ALTERNATIVE_TITLS[getRandomInteger(0, ALTERNATIVE_TITLS.length - 1)],
      "total_rating": generateRating(),
      "poster": `images/posters/${generatePoster()}`,
      "age_rating": 0,
      "director": "Tom Ford",
      "writers": [
        "Takeshi Kitano"
      ],
      "actors": [
        "Morgan Freeman"
      ],
      "release": {
        "date": "2019-05-11T00:00:00.000Z",
        "release_country": "Finland"
      },
      "runtime": 77,
      "genre": [
        "Comedy"
      ],
      "description": DESCRIPTIONS_TEXT[getRandomInteger(0, DESCRIPTIONS_TEXT.length - 1)]
    },

    "user_details": {
      "watchlist": false,
      "already_watched": true,
      "watching_date": "2019-04-12T16:12:32.554Z",
      "favorite": false
    }
  };
};
