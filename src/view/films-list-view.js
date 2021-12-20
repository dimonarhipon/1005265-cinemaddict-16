import AbstractView from './abstract-view';

const createFilmsListTemplate = () => `<section class="films-list">
  <h2 class="films-list__title visually-hidden"></h2>
</section>`;

export default class FilmsListView extends AbstractView {
  get template() {
    return createFilmsListTemplate();
  }
}
