import { addClass, closest, removeClass } from "../utils/_domFunction.js";

class ModalView {
  _modals = [...document.querySelectorAll(".modal")];
  _currentModal;

  // - PUBLIC *******************************************
  showModel(action) {
    this._currentModal = this._findCurrentModal(action);
    removeClass(this._currentModal, "hidden");
  }

  setPlayistNameAttribute(playlistName) {
    this._currentModal.dataset.playlist = playlistName;
    this._currentplaylistName = playlistName;
  }

  // - PRIVATE ***************************************
  _findCurrentModal(action) {
    return document.querySelector(`.modal[data-action=${action}]`);
  }

  _hideModal() {
    addClass(this._currentModal, "hidden");
  }

  _getInputName() {
    return this._currentModal.querySelector(".modal-input ").value.trim();
  }

  _clearInputName() {
    const input = this._currentModal.querySelector(".modal-input");
    if (input) input.value = "";
  }

  // FUNCTION HANDLER *************************************
  _handleRenameBtn(target, handle) {
    // check target  is right
    if (!closest(target, "modal-btn[data-action='rename']")) return;

    // handle input
    const newPlaylistName = this._getInputName();
    if (
      !newPlaylistName ||
      newPlaylistName === "" ||
      newPlaylistName === undefined
    )
      return;

    handle("rename", this._currentplaylistName, newPlaylistName);
    this._clearInputName();
    this._hideModal();
  }

  _handleCancelBtn(target) {
    // check target  is right
    if (!closest(target, "modal-btn[data-action='cancel']")) return;

    this._clearInputName();
    this._hideModal();
  }

  _handleDeleteBtn(target, handle) {
    // check target  is right
    if (!closest(target, "modal-btn[data-action='delete']")) return;

    handle("delete", this._currentplaylistName);
    this._hideModal();
  }

  addHandleModalBtns(handle) {
    for (const modal of this._modals) {
      modal.addEventListener("click", (e) => {
        const target = e.target;

        // const modalEl ;

        // handle input && handle rename playlist
        this._handleRenameBtn(target, handle);

        // handle delete playlist
        this._handleDeleteBtn(target, handle);

        // handle cancel operation
        this._handleCancelBtn(target);
      });
    }
  }
}

export default new ModalView();
