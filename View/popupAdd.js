import CrudView from "./CrudView.js";
class popupAddPlayList {
  _parentEl = document.querySelector(".popup__add");
  _;
  _songsArr;

  showPopupAndAddSongs(selectedSongs=[]) {
    this._songsArr = selectedSongs;
    this._parentEl.classList.remove("hidden");
  }

  addhandlerCreatePlaylist(handle) {
    this._parentEl.addEventListener("click", (e) => {
      const target = e.target.closest(".popup__add-btn");
      if (!target) return;

      const { action } = target.dataset;

      //   if btn is cancel
      if (action === "cancel") return this._parentEl.classList.add("hidden");

      //   if btn is create
      const playListNameEl = this._parentEl.querySelector(".popup__add-input");

      const value = playListNameEl.value.trim();

      if (!value && value === "") return;
      
      // all goes successful
      handle(value, this._songsArr);
      this._songsArr = [];
      playListNameEl.value = "";
      this._parentEl.classList.add("hidden");
      CrudView.hide()
    });
  }
}

export default new popupAddPlayList();
