import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { getRandomInteger, getRandomElementOfArray } from '../utils';

import { COMMENT_COUNT, NAMES, EMOTIONS, COMMENTS_TEXT, TITLS, ALTERNATIVE_TITLS, POSTERS, DESCRIPTIONS_TEXT, GENERS, COUNTRYS, MAX_YEARS, MIN_YEARS, MAX_DAYS, MAX_HOURS, MIX_HOURS, MIN_MINUTE, MAX_MINUTE, COUNT_MOVIE, MAX_AGE_RATING} from '../const';

const generateDurationMovie = () => {
  const gapHours = getRandomInteger(MIX_HOURS, MAX_HOURS);
  const gapMinute = getRandomInteger(MIN_MINUTE, MAX_MINUTE);
  const time = dayjs().hour(gapHours).minute(gapMinute);
  return time;
};

const generateYears = () => {
  const yearsGap = getRandomInteger(MIN_YEARS, MAX_YEARS);
  const year = dayjs().year(yearsGap).format('YYYY');
  return year;
};

const generateDate = () => {
  const daysGap = getRandomInteger(0, MAX_DAYS);
  const date = dayjs().day(daysGap).toDate();
  return date;
};

const generateComment = () => ({
  'id': nanoid(),
  'author': getRandomElementOfArray(NAMES),
  'message': getRandomElementOfArray(COMMENTS_TEXT),
  'date': generateDate(),
  'emotion': getRandomElementOfArray(EMOTIONS)
});

const generateComments = () => Array.from({length: getRandomInteger(0, COMMENT_COUNT)}, generateComment);

const generateRating = () => (Math.ceil(getRandomInteger(1, 100)) * 0.1).toFixed(1);

export const generageMovie = () => ({
  'id': nanoid(),
  'comments': generateComments(),

  'userDetails': {
    'isWatch': Boolean(getRandomInteger(0, 1)),
    'isWatched': Boolean(getRandomInteger(0, 1)),
    'watchingDate': generateDate(),
    'isFavorite': Boolean(getRandomInteger(0, 1))
  },

  'filmInfo': {
    'title': getRandomElementOfArray(TITLS),
    'alternativeTitle': getRandomElementOfArray(ALTERNATIVE_TITLS),
    'totalRating': generateRating(),
    'poster': `images/posters/${getRandomElementOfArray(POSTERS)}`,
    'ageRating': getRandomInteger(0, MAX_AGE_RATING),
    'director': getRandomElementOfArray(NAMES),
    'writers': [
      getRandomElementOfArray(NAMES)
    ],
    'actors': [
      getRandomElementOfArray(NAMES)
    ],
    'release': {
      'date': generateYears(),
      'release_country': getRandomElementOfArray(COUNTRYS)
    },
    'runtime': generateDurationMovie(),
    'genre': [
      getRandomElementOfArray(GENERS)
    ],
    'description': getRandomElementOfArray(DESCRIPTIONS_TEXT)
  },
});

export const generageCountMovie = () => COUNT_MOVIE;
