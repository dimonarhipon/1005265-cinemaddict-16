import AbstractObservable from '../utils';
import {FilterType} from '../const';

export default class FilterModel extends AbstractObservable {
  #filter = FilterType.ALL;

  setFilmsFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }

  get filter() {
    return this.#filter;
  }
}
