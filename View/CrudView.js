import ParentView from "./ParentView.js";
import DropListView from "./dropListView.js";
import {
  closest,
  contains,
  addClass,
  removeClass,
  toggleClass,
} from "../utils/_domFunction.js";

class CrudView extends ParentView {
  _parentEl = document.querySelector(".crud");
  _cardList = document.querySelector(".section-overview .card__list");

  _cardElArr = [...this._cardList.querySelectorAll(".card")];
  _selectAllBtn = document.querySelector(".card__control--crud");
  _addPlaylistBtnList = this._parentEl.querySelector(".drop__list");
  _cardItems = [...document.querySelectorAll(".section-overview .card")];

  constructor() {
    super();
  }

  renderAddPlayBtnList(arr) {
    const html = DropListView.render(arr, false);
    this._addPlaylistBtnList.innerHTML = "";
    this._addPlaylistBtnList.insertAdjacentHTML("beforeend", html);
    this._addPlaylistBtnList.insertAdjacentHTML(
      "afterbegin",
      `    <li
                class="nav__item drop__item"
                data-action="create"
                drop-value=""
              >
                + New PlayList
              </li>`
    );
  }

  hide() {
    this._unSelectAllCard();
    this.updateSelectedCardsCount();
    removeClass(this._selectAllBtn, "card__control--active");
    addClass(this._parentEl, "hide");
  }

  _updateCardListEl() {
    this._cardElArr = [...this._cardList.querySelectorAll(".card")];
  }

  _unSelectAllCard() {
    removeClass(this._cardList, "card__list--select");
    this._cardElArr.forEach((mov) => {
      // card control select ALL as active

      mov
        .querySelector('.card__control[data-action="select"]')
        .classList.remove("card__control--active");

      mov.dataset.select = false;
    });
  }

  _selectAllCard() {
    addClass(this._cardList, "card__list--select");
    this._cardElArr.forEach((mov) => {
      mov
        .querySelector('.card__control[data-action="select"]')
        .classList.add("card__control--active");

      mov.dataset.select = true;
    });
  }

  _removeSelectedCard() {
    [...document.querySelectorAll(".card")].forEach((mov) => {
      if (mov.querySelector('.card__control--active[data-action="select"]'))
        mov.remove();
    });
  }

  _findSelectedCardIndex() {
    let indexArr = [];

    // to check if card are selected
    [...document.querySelectorAll(".card")].forEach((mov) => {
      if (mov.dataset.select === "true") indexArr.push(mov.dataset.index);
    });

    return indexArr;
  }

  handleCrud(handle) {
    this._parentEl.addEventListener("click", (e) => {
      const initalTarget = e.target;

      this._updateCardListEl();
      let target = e.target;

      // select button---------------------------------------
      if (closest(target, "card__control")) {
        target = closest(target, "card__control");
        toggleClass(target, "card__control--active");

        if (contains(target, "card__control--active")) this._selectAllCard();
        else {
          this._unSelectAllCard();
          addClass(this._parentEl, "hide");
        }

        this.updateSelectedCardsCount();
      }

      // to go back to normal home page ------------------------------------------
      if (closest(target, "crud-clear")) {
        target = closest(target, "crud-clear");

        addClass(this._parentEl, "hide");
        removeClass(this._selectAllBtn, "card__control--active");
        // remove select element active class

        this._unSelectAllCard();
      }

      // music btns----------------------------------
      if (closest(target, "crud__btn")) {
        toggleClass(this._parentEl, "hide");

        target = target.closest(".crud__btn");
        const { action } = target.dataset;
        const arr = this._findSelectedCardIndex();

        // Selected Card

        // Removing cards dom
        if (action === "remove") {
          this._removeSelectedCard();
          this.hide();
          handle("remove", arr);
        }

        if (action === "add-to-playlist") {
          removeClass(this._parentEl, "hide");
          const item = initalTarget.closest(".drop__item");

          if (!item) return handle("add-to-playlist");
          const { value, action } = item.dataset;
          if (action === "create") {
            handle("create-playlist", arr);
          } else {
            handle("select-playlist", arr, value);
          }

          if (action === "create-playlist" || action === "select-playlist")
            this.hide();
        }

        if (action === "play") {
          handle("play-next", arr);
          this.hide();
        }

        // play music

        // add to playlist
      }
    });
  }
}

export default new CrudView();
