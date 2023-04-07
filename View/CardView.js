import {
  contains,
  closest,
  setActiveElInArr,
  findEl,
  addClass,
  findActiveElInArr,
} from "../utils/_domFunction.js";
import ParentView from "./ParentView.js";
import CrudView from "./CrudView.js";

class CardView extends ParentView {
  _parentEl = document.querySelector(".card__list");
  _cardListArr = [...document.querySelectorAll(".card__list")];
  _playBtn = document.querySelector(".section-control .music__play-btn");

  _cardEl;
  _cardElArr;
  _controlContainer;
  _controlElArr;

  _curControlActive;
  _curCardIndex;
  _crudContainer = document.querySelector(".crud");
  _body = document.querySelector("body");

  _normalClass = "card__control";
  _activeClass = "card__control--active";
  _sectionArr = [...document.querySelectorAll("section")];

  constructor() {
    super();
  }

  _generateItemMarkUp(mov, i) {
    return `
            <li class="card" data-index=${i} data-music=${mov.music}>
              <div class="card__controls hidden">
                <div class="card__control" data-action="setting" >
                  <i class="card__control-icon fa fa-ellipsis-h"></i>

                  <ul class="nav__list card__settings">
                    <li class="nav__item" data-action="play">Play</li>
                    <li class="nav__item" data-action="play-next">
                      Play Next
                    </li>
                    <li class="nav__item" data-action="remove">Remove</li>
                  </ul>
                </div>
                <div class="card__control" data-action="play">
                  <i class="card__control-icon fa fa-play"></i>
                </div>
                <div class="card__control" data-action="select">
                  <i class="card__control-icon fa-solid fa-check "></i>
                </div>
               </div>
              <img
                id="currentPhoto"
                src="/img/${mov.img}"
                class="card__img card__img--overview"
                onerror="this.onerror=null; this.src='img/default.jpg'"
                alt=""
              />
              <p class="card__name card__name--overview">
                ${mov.name}
              </p>
              <p class="card__artist card__artist--overview">
                ${mov.author}
              </p>
            </li>
        `;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  _setClickCardComponents(card) {
    if (!card) return;
    this._cardEl = card;
    this._curCardIndex = card.dataset.index;
    this._controlContainer = card.querySelector(".card__controls");
    this._controlElArr = card.querySelectorAll(".card__control");
    this._cardElArr = document.querySelectorAll(".card");
  }

  _isAnyCardSelected() {
    let count = 0;
    this._cardElArr.forEach((mov) => {
      if (
        mov
          .querySelector('.card__control[data-action="select"]')
          ?.classList.contains("card__control--active")
      )
        count++;
    });

    if (count > 0) return true;
    return false;
  }

  _selectCard(card) {
    // if (!this._isAnyCardSelected()) return CrudView.hide();

    card
      .querySelector('.card__control[data-action="select"]')
      .classList.toggle("card__control--active");

    this.updateSelectedCardsCount();
    if (!this._isAnyCardSelected()) return CrudView.hide();
  }

  _hideSettingControl() {
    this._body.addEventListener("click", (e) => {
      const target = e.target;
      if (!closest(target, this._normalClass)) {
        this._cardEl.classList.remove("show--control-setting");
        this._curControlActive.classList.remove(this._activeClass);
      }
    });
  }

  _updateCardListArr() {
    this._cardListArr = [...document.querySelectorAll(".card__list")];
  }

  _handleCard(handle, e) {
    this._updateCardListArr();
    let target = e.target;

    const card = target.closest(".card");
    if (!card) return;
    this._setClickCardComponents(card);

    // const cardIndex = +target.closest(".card").dataset.index;
    const { index, name, belongTo } = this._cardEl.dataset;

    // Play song when user simple click on card
    if (
      !closest(target, "card__control") ||
      closest(target, 'card__control[data-action="play"]')
    ) {
      if (this._isAnyCardSelected()) return this._selectCard(card);

      this._playBtn.dataset.action = "pause";

      if (belongTo === "search") handle("play-next", index, null, true);
      else if (belongTo === "playlist") handle("open-playlist", null, name);
      else if (name) handle("play", null, {}, name);
      else handle("play", index);
    }

    // handle card setting CONTROL  options
    if (closest(target, "nav__item")) {
      const { action, belongTo } = target.closest(".nav__item").dataset;

      if (action === "remove") {
        // name playlist songs (contain more than 1 songs )
        if (name && !belongTo) handle(action, null, name);
        else if (!belongTo) handle(action, index);
        else if (belongTo) handle(action, null, name, "refresh-crudPlaylist");
        return this._cardEl.remove();
      } else {
        if (name) handle(action, null, name);
        else handle(action, index);
      }
    }

    //////////////////////////////////////////////////////////////////////////////
    //  CSS Stuff ************************************************************
    target = target.closest(".card__control");

    if (!target) return; //playsong;

    const { action } = target.dataset;

    // setting
    if (action === "setting") {
      target.classList.toggle(this._activeClass);

      if (contains(target, this._activeClass)) {
        // hide cardSetting if already displaying in other cards
        this._cardElArr.forEach((mov) => {
          if (mov === target) return;

          if (contains(mov, "show--control-setting")) {
            mov.classList.remove("show--control-setting");

            mov
              .querySelector('.card__control[data-action="setting"]')
              .classList.remove("card__control--active");
          }
        });

        this._cardEl.classList.add("show--control-setting");

        this._curControlActive = target;
        this._hideSettingControl();
      } else {
        this._cardEl.classList.remove("show--control-setting");
      }
    }

    if (action === "select") {
      target.classList.toggle(this._activeClass);

      // show the number of selected cards in crudContainer

      this.updateSelectedCardsCount();
      if (contains(target, this._activeClass)) {
        this._crudContainer.classList.remove("hide");
        this._parentEl.classList.add("card__list--select");
        this._cardEl.dataset.select = true;
        // target.classList.add(this._activeClass);
      } else {
        this._cardEl.dataset.select = false;
        // CrudView.hide()
      }

      if (!this._isAnyCardSelected()) CrudView.hide();
    }
  }

  _resetAddHandlerControlsToSearchCardList(handle) {
    console.log("done");
    const _searchResultCardListEl = document.querySelector(
      ".section-searchResults .card__list"
    );
    _searchResultCardListEl.removeEventListener(
      "click",
      this._handleCard.bind(this)
    );
    _searchResultCardListEl.addEventListener(
      "click",
      this._handleCard.bind(this, handle)
    );
  }

  addhandlerControls(handle) {
    for (const el of this._cardListArr) {
      el.addEventListener("click", this._handleCard.bind(this, handle));
    }
  }
}

export default new CardView();
