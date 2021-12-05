import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { getRandomInteger, getRandomElementOfArray } from "../utils";

import { COMMENT_COUNT, NAMES, EMOTIONS, COMMENTS_TEXT, TITLS, ALTERNATIVE_TITLS, POSTERS, DESCRIPTIONS_TEXT, GENERS, COUNTRYS, MAX_YEARS, MIN_YEARS, MAX_DAYS, MAX_HOURS, MIX_HOURS, MIN_MINUTE, MAX_MINUTE, COUNT_MOVIE, MAX_AGE_RATING} from "../const";

const generateDurationMovie = () => {
  const gapHours = getRandomInteger(MIX_HOURS, MAX_HOURS);
  const gapMinute = getRandomInteger(MIN_MINUTE, MAX_MINUTE);
  const time = dayjs().hour(gapHours).minute(gapMinute);
  return time;
};

const generateYears = () => {
  const yearsGap = getRandomInteger(MIN_YEARS, MAX_YEARS);
  const year = dayjs().year(yearsGap).format("YYYY");
  return year;
};

const generateDate = () => {
  const daysGap = getRandomInteger(0, MAX_DAYS);
  const date = dayjs().day(daysGap).toDate();
  return date;
};

const generateComment = () => ({
  "id": nanoid(),
  "author": getRandomElementOfArray(NAMES),
  "comment": getRandomElementOfArray(COMMENTS_TEXT),
  "date": generateDate(),
  "emotion": getRandomElementOfArray(EMOTIONS)
});

const generateComments = () => {
  return Array.from({length: getRandomInteger(0, COMMENT_COUNT)}, generateComment);
};

const generateRating = () => {
  return (Math.ceil(getRandomInteger(1, 100)) * 0.1).toFixed(1);
};


export const generageMovie = () => {
  return {
    "id": nanoid(),
    "comments": generateComments(),

    "film_info": {
      "title": getRandomElementOfArray(TITLS),
      "alternative_title": getRandomElementOfArray(ALTERNATIVE_TITLS),
      "total_rating": generateRating(),
      "poster": `images/posters/${getRandomElementOfArray(POSTERS)}`,
      "age_rating": getRandomInteger(0, MAX_AGE_RATING),
      "director": getRandomElementOfArray(NAMES),
      "writers": [
        getRandomElementOfArray(NAMES)
      ],
      "actors": [
        getRandomElementOfArray(NAMES)
      ],
      "release": {
        "date": generateYears(),
        "release_country": getRandomElementOfArray(COUNTRYS)
      },
      "runtime": generateDurationMovie(),
      "genre": [
        getRandomElementOfArray(GENERS)
      ],
      "description": getRandomElementOfArray(DESCRIPTIONS_TEXT)
    },

    "user_details": {
      "watchlist": Boolean(getRandomInteger(0, 1)),
      "already_watched": Boolean(getRandomInteger(0, 1)),
      "watching_date": generateDate(),
      "favorite": Boolean(getRandomInteger(0, 1))
    }
  };
};

export const generageCountMovie = () => COUNT_MOVIE;
