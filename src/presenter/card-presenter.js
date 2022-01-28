import CardView from '../view/card-view';
import PopupView from '../view/popup-view';
import {UserAction, UpdateType} from '../const';
import {remove, render, replace, RenderPosition} from '../utils';

export default class CardPresenter {
  #cardComponent = null;
  #popupComponent = null;
  #cardListContainer = null;
  #changeData = null;
  #movieInfo = null;
  #comments = null;

  constructor(cardListContainer, changeData) {
    this.#cardListContainer = cardListContainer;
    this.#changeData = changeData;
  }

  init = (movieInfo, comments) => {
    this.#movieInfo = movieInfo;
    this.#comments = [...comments];

    const prevCardComponent = this.#cardComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#cardComponent = new CardView(movieInfo);
    this.#popupComponent = new PopupView(movieInfo, this.#comments);

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
    this.#popupComponent.reset(this.#movieInfo);
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
      {...this.#movieInfo,
        userDetails: {
          ...this.#movieInfo.userDetails,
          isWatch: !this.#movieInfo.userDetails.isWatch
        }
      });
  };

  #controlFavoriteList = () => {
    this.#changeData(
      UserAction.UPDATE_ELEMENT,
      UpdateType.MINOR,
      {...this.#movieInfo,
        userDetails: {
          ...this.#movieInfo.userDetails,
          isFavorite: !this.#movieInfo.userDetails.isFavorite
        }
      });
  };

  #controlWatchedList = () => {
    this.#changeData(
      UserAction.UPDATE_ELEMENT,
      UpdateType.MINOR,
      {...this.#movieInfo,
        userDetails: {
          ...this.#movieInfo.userDetails,
          isWatched: !this.#movieInfo.userDetails.isWatched
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
