import ParentView from "./ParentView.js";
import {
  addClass,
  closest,
  removeClass,
  toggleClass,
  replaceClass,
  contains,
} from "../utils/_domFunction.js";
import ModalView from "./ModalView.js";

class Playlist extends ParentView {
  _currentPlaylist;
  _sectionEl = document.querySelector(".section-playlistSong");

  // PLAYLIST ITEMS BUTTONS
  _playlistSongList = document.querySelector(".playlistSong__list");
  _playlistItems = [...document.querySelectorAll(".playlistSong__item")];

  // CRUD BUTTONS
  _manageCrudContainer = document.querySelector(".manage");
  _manageSelectCountEl = document.querySelector(".manage__select-count");
  _manageSelectBtn = document.querySelector(".manage__select-btn");

  // HEADER BUTTONS
  _headerEl = document.querySelector(".playlistSong__header");
  _headerBtnsBox = document.querySelector(".playlistSong__btn-box");
  _mainControlBtns = [
    ...document.querySelectorAll(".playlistSong__control-btn"),
  ];

  _updatePlaylistItems() {
    this._playlistItems = [...document.querySelectorAll(".playlistSong__item")];
  }

  _setPlaylistAtrribute(playlist) {
    this._currentPlaylist = playlist.name;
    this._sectionEl.dataset.playlist = this._currentPlaylist;
    // this._currentPlaylist = playlist.name;
  }

  render(playlist) {
    this._toggleSectionHiddenClass();

    this._playlistSongList.innerHTML = "";
    console.log(playlist);
    if (!playlist) return this._renderHeader(playlist, false);

    this._renderHeader(playlist, true);

    const html = this._generateMarkUpList(playlist.songs);
    this._playlistSongList.innerHTML = html;
    this._setPlaylistAtrribute(playlist);
  }

  renderImgCollage(playlist, playlistExist = true) {
    const limitSongs = playlist.songs.slice(0, 4);
    return playlistExist
      ? limitSongs
          .map(
            (song) =>
              `<img src="img/${song.img}" class="playlistSong__gallery-img" alt="" />`
          )
          .join("")
      : "";
  }

  //  update playlist and update header
  _renderHeader(playlist, playlistExist = true) {
    this._currentPlaylist = !playlistExist ? undefined : playlist;
    this._headerEl.innerHTML = "";
    let html;

    html = `<div class="card__collage playlistSong__gallery">

                    ${
                      playlist
                        ? this.renderImgCollage(playlist, playlistExist)
                        : ""
                    }
                
                    </div>
                      <div class="playlistSong__header-text">
                          <h3 class="playlistSong__heading heading-3 mg-lw">
                          ${playlist?.name}
                          </h3>
                                  <div class="playlistSong__totalSongs">${
                                    playlistExist ? playlist?.songs.length : 0
                                  } items</div>
                              </div>
                              
                              <div class="playlistSong__btn-box ">
                                <button
                                  class="playlistSong__control-btn btn btn--primary"
                                  data-action="play"
                                >
                                  <i class="fa fa-play"></i>
                                  <span>Play</span>
                                </button>
                                <button
                                  class="playlistSong__control-btn btn btn--primary"
                                  data-action="rename"
                                >
                                  <i class="fa fa-play"></i>
                                  <span>Rename</span>
                                </button>
                                <button
                                  class="playlistSong__control-btn btn btn--primary"
                                  data-action="delete"
                                >
                                  <i class="fa fa-play"></i>
                                  <span>Delete</span>
                                </button>
                          </div>`;

    this._headerEl.insertAdjacentHTML("afterbegin", html);
  }

  _generateItemMarkUp(song) {
    return `   <li
                  class="playlistSong__item"
                  data-index=${song.index}
                  data-active="false"
                  data-hide-play-icon="false"
                  data-selected="false"
                >
                  <button class="playlistSong__select-btn">
                    <i
                      class="fas fa-headphones playlistSong__icon playlistSong__icon-headphone hidden"
                      aria-hidden="true"
                    ></i>
                    <i
                      class="fa-solid fa-check playlistSong__icon playlistSong__icon-select hidden"
                    ></i>
                  </button>

                  <button
                    class="playlistSong__btn playlistSong__btn-play"
                    data-action="play"
                  >
                    <i
                      class="fa fa-music playlistSong__icon playlistSong__icon-music"
                      aria-hidden="true"
                    ></i>
                    <i
                      class="fa fa-play playlistSong__icon playlistSong__icon-play hidden"
                      aria-hidden="true"
                    ></i>
                  </button>

                  <p class="playlistSong__name">${song.name}</p>
                  <p class="playlistSong__artist">${song.author}</p>
                  <p class="playlistSong__duration">3:00</p>
                </li>`;
  }

  _removeItemFromHTML(indexArr) {
    for (const givenIndex of indexArr) {
      this._playlistItems.forEach((el) => {
        if (Number(givenIndex) === Number(el.dataset.index)) el.remove();
      });
    }
  }

  // ***********************************************************************
  // Common Function *************************************************
  _enableSelectionOnItems() {
    this._playlistSongList.dataset.selectionOn = true;
    this._playlistSongList.dataset.hidePlayIcon = true;
  }
  _disableSelectionOnItems() {
    this._playlistSongList.dataset.selectionOn = false;
    this._playlistSongList.dataset.hidePlayIcon = false;
  }

  _selectAllItems() {
    for (const playlistItem of this._playlistItems)
      playlistItem.dataset.selected = true;
  }
  _unSelectAllItems() {
    for (const playlistItem of this._playlistItems)
      playlistItem.dataset.selected = false;
  }

  _selectGivenItem(target) {
    target.dataset.selected = true;
  }
  _unSelectGivenItem(target) {
    target.dataset.selected = false;
  }

  _countSelectedItems() {
    let count = 0;
    for (const item of this._playlistItems) {
      if (item.dataset.selected === "true") count++;
    }

    return count;
  }

  _setGivenItemAsActiveOnly(target) {
    this._playlistItems.forEach((item) => {
      item.dataset.active = "false";
    });
    target.dataset.active = "true";
  }
  _setGivenItemAsUnActive(target) {
    target.dataset.active = false;
  }

  _setAllItemsAsActive() {
    this._playlistItems.forEach((item) => (item.dataset.active = "true"));
  }

  _setAllItemsAsUnactive() {
    this._playlistItems.forEach((item) => (item.dataset.active = "false"));
  }

  _showCrudContainer() {
    replaceClass(this._manageCrudContainer, "hide", "show");
  }

  _hideCrudContainer() {
    replaceClass(this._manageCrudContainer, "show", "hide");
  }

  _updateCrudSelectCount() {
    // update the select count items
    const selectedItems = this._countSelectedItems();
    this._manageSelectCountEl.textContent = `${selectedItems} items selected`;
  }

  _updateSelectBtn(selected) {
    // toggle btn
    this._manageSelectBtn.dataset.selected =
      selected === "true" ? "false" : "true";
  }

  // disabled playlist header buttons
  _disabledMainPlalistControlBtns() {
    this._headerEl.dataset.disableBtns = true;
    this._mainControlBtns.forEach((mov) => (mov.dataset.disable = true));
  }

  // enabled playlist header buttons
  _enabledMainPlalistControlBtns() {
    this._headerEl.dataset.disableBtns = false;
    this._mainControlBtns.forEach((mov) => (mov.dataset.disable = false));
  }

  // reset el that are repeating
  _resetAllSelectionsDone() {
    this._updateSelectBtn("true");
    this._disableSelectionOnItems();
    this._unSelectAllItems();
    this._hideCrudContainer();
    this._updateCrudSelectCount();
    this._enabledMainPlalistControlBtns();
  }

  _getSelectedItemIndexArr() {
    return this._playlistItems
      .filter((mov) => mov.dataset.selected === "true")
      .map((mov) => mov.dataset.index);
  }

  _getFirstPlaylistItemIndex() {
    return this._playlistSongList.querySelector(".playlistSong__item").dataset
      .index;
  }

  getActiveItemIndex() {
    this._updatePlaylistItems();
    const activeItem = this._playlistItems.find(
      (mov) => mov.dataset.active === "true"
    );

    return (
      (activeItem && activeItem.dataset.index) ||
      this._getFirstPlaylistItemIndex()
    );
  }

  // make code in function  reuse again when you see you are writing another function you now need that functionality again so then put that resuse code into function ok sir

  // ***********************************************************************
  // FUNCTION  addHandlerManagePlaylist(handle) *****************************
  _handlePlaylistItemSelectBtn(target) {
    const selectBtnClicked = closest(target, "playlistSong__select-btn");
    if (!selectBtnClicked) return;

    const playlistItem = closest(target, "playlistSong__item");

    const alreadySelectedItem = this._countSelectedItems();
    const { selected } = playlistItem.dataset;

    // when more than 0 item is selected but we are unselecting them
    if (selected === "true") {
      this._unSelectGivenItem(playlistItem);
    }

    // when no item is selected
    if (alreadySelectedItem === 1 && selected === "true") {
      this._resetAllSelectionsDone();
    }

    // when we are selecting items
    if (alreadySelectedItem >= 0 && selected === "false") {
      // dont need to make resuse again as this is not needed anywhere else ok sir
      this._selectGivenItem(playlistItem);
      this._enableSelectionOnItems();
      this._showCrudContainer();
      this._showCrudContainer();
      this._disabledMainPlalistControlBtns();
    }

    this._updateCrudSelectCount();
  }

  _handlePlaylistItemPlayBtn(target, handle) {
    const playBtn = closest(target, "playlistSong__btn-play");
    if (!playBtn) return;

    // do not allow song to play when selection is on
    if (this._countSelectedItems > 0) return;

    const curPlaylistItem = closest(target, "playlistSong__item");
    this._setGivenItemAsActiveOnly(curPlaylistItem);
    const { index } = curPlaylistItem.dataset;

    handle("play", this._currentPlaylist, index);
  }

  // +++++++++++
  addHandlerPlaylistItemsBtns(handle) {
    this._playlistSongList.addEventListener("click", (e) => {
      this._updatePlaylistItems();
      const target = e.target;

      // select by clicking items
      this._handlePlaylistItemSelectBtn(target);

      // play song by clicking items
      this._handlePlaylistItemPlayBtn(target, handle);
    });
  }

  // ***********************************************************************
  // FUNCTION addHandleManageCrudOperation*******************************
  _handleCrudSelectBtn(target) {
    const selectBtn = closest(target, "manage__select-btn");
    if (!selectBtn) return;

    const { selected } = selectBtn.dataset;

    if (selected === "false") {
      selectBtn.dataset.selected = "true";
      this._selectAllItems();
      this._updateCrudSelectCount();
      return;
    }

    this._resetAllSelectionsDone();
  }
  _handleCrudHideBtn(target) {
    const selectBtn = closest(target, "manage__clear-btn");
    if (!selectBtn) return;

    // set all selected options
    this._resetAllSelectionsDone();
  }

  _handleCrudPlayBtn(target, handle) {
    const playBtn = closest(target, "manage__play-btn");
    if (!playBtn) return;

    // get all seleced items index
    const selectedItemIndexArr = this._getSelectedItemIndexArr();
    this._resetAllSelectionsDone();
    handle("play", this._currentPlaylist, selectedItemIndexArr);
  }

  _handleCrudRemoveBtn(target, handle) {
    const removeBtn = closest(target, "manage__remove-btn");
    if (!removeBtn) return;
    const removeItemIndexArr = this._getSelectedItemIndexArr();

    this._removeItemFromHTML(removeItemIndexArr);
    this._resetAllSelectionsDone();
    handle("remove", this._currentPlaylist, removeItemIndexArr);
  }

  // +++++++++++
  addHandlerCrudOperationBtns(handle) {
    this._manageCrudContainer.addEventListener("click", (e) => {
      this._updatePlaylistItems();
      const target = e.target;

      // to select or unselect all songs
      this._handleCrudSelectBtn(target);

      // to reset all the changed made
      this._handleCrudHideBtn(target);

      // // to play song
      this._handleCrudPlayBtn(target, handle);

      // // to remove songs
      this._handleCrudRemoveBtn(target, handle);
    });
  }

  // FUNCTION  addHandlePHeaderBtns*******************************

  _areHeaderBtnsDisabled() {
    if (this._headerEl.dataset.disableBtns === "true") return true;
    return false;
  }

  _isPlaylistEmpty() {
    if (this._playlistItem && this._playlistItems?.length === 0) return true;
    return false;
  }

  _handleHeaderPlayBtn(target, handle) {
    if (!closest(target, 'playlistSong__control-btn[data-action="play"]'))
      return;
    const getFirstPlaylistSongIndex = this._getFirstPlaylistItemIndex();
    if (!getFirstPlaylistSongIndex) return;
    handle("play", this._currentPlaylist, getFirstPlaylistSongIndex);
  }

  _handleHeaderRenameBtn(target) {
    if (!closest(target, 'playlistSong__control-btn[data-action="rename"]'))
      return;

    ModalView.showModel("rename");
    ModalView.setPlayistNameAttribute(this._currentPlaylist);
  }

  _handleHeaderDeleteBtn(target) {
    if (!closest(target, 'playlistSong__control-btn[data-action="delete"]'))
      return;

    ModalView.showModel("delete");
    ModalView.setPlayistNameAttribute(this._currentPlaylist);
  }

  // +++++++++++
  addHandlerHeaderBtns(handle) {
    this._headerEl.addEventListener("click", (e) => {
      this._updatePlaylistItems();
      const target = e.target;

      if (this._areHeaderBtnsDisabled()) return;

      console.log(this._isPlaylistEmpty());

      // rename  playlist
      this._handleHeaderRenameBtn(target);

      this._handleHeaderDeleteBtn(target);

      // play playlist
      if (this._isPlaylistEmpty()) return;
      this._handleHeaderPlayBtn(target, handle);

      // delete playlist
    });
  }
}

export default new Playlist();
