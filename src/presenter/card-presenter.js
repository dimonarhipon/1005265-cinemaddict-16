import CardView from '../view/card-view';
import PopupView from '../view/popup-view';
import {UserAction, UpdateType} from '../const';
import {remove, render, replace, RenderPosition} from '../utils';

export default class CardPresenter {
  #cardComponent = null;
  #popupComponent = null;
  #cardListContainer = null;
  #changeData = null;
  #film = null;
  #comments = null;

  constructor(cardListContainer, changeData) {
    this.#cardListContainer = cardListContainer;
    this.#changeData = changeData;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    const prevCardComponent = this.#cardComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#cardComponent = new CardView(film, this.#comments);
    this.#popupComponent = new PopupView(film, this.#comments);

    this.#cardComponent.setOpenClickHandler(() => {
      this.#openPopupHandler();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#cardComponent.setControlWatch(this.#controlWatchList);
    this.#cardComponent.setControlFavorite(this.#controlFavoriteList);
    this.#cardComponent.setControlWatched(this.#controlWatchedList);

    this.#popupComponent.setCloseClickHandler(this.#closePopupHandler);
    this.#popupComponent.setControlWatch(this.#controlWatchList);
    this.#popupComponent.setControlFavorite(this.#controlFavoriteList);
    this.#popupComponent.setControlWatched(this.#controlWatchedList);
    // this.#popupComponent.setSubmitComment(this.#submitComment);
    this.#popupComponent.setDeleteComment(this.#deleteComment);

    if (prevCardComponent === null || prevPopupComponent === null) {
      render(this.#cardListContainer, this.#cardComponent.element, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#cardListContainer.element.contains(prevCardComponent.element)) {
      replace(this.#cardComponent, prevCardComponent);
    }

    if (this.#cardListContainer.element.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  }

  #openPopupHandler = () => {
    render(this.#cardListContainer, this.#popupComponent.element, RenderPosition.BEFOREEND);
    document.querySelector('body').classList.add('hide-overflow');

    this.#popupComponent.restoreHandlers();
  };

  #closePopupHandler = () => {
    this.#popupComponent.reset(this.#film);
    remove(this.#popupComponent);
    document.querySelector('body').classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopupHandler();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #controlWatchList = () => {
    this.#changeData(
      UserAction.UPDATE_ELEMENT,
      UpdateType.MINOR,
      {...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          isWatch: !this.#film.userDetails.isWatch
        }
      });
  };

  #controlFavoriteList = () => {
    this.#changeData(
      UserAction.UPDATE_ELEMENT,
      UpdateType.MINOR,
      {...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          isFavorite: !this.#film.userDetails.isFavorite
        }
      });
  };

  #controlWatchedList = () => {
    this.#changeData(
      UserAction.UPDATE_ELEMENT,
      UpdateType.MINOR,
      {...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          isWatched: !this.#film.userDetails.isWatched
        }
      });
  };

  #submitComment = (film, comment) => {
    this.#changeData(
      UserAction.ADD_ELEMENT,
      UpdateType.PATCH,
      film,
      comment
    );
  }

  #deleteComment = (film, comment) => {
    this.#changeData(
      UserAction.DELETE_ELEMENT,
      UpdateType.PATCH,
      film,
      comment
    );
  };

  destroy = () => {
    remove(this.#cardComponent);
    remove(this.#popupComponent);
  };
}
