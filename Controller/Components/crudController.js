import CrudView from "../../View/CrudView.js";
import { state, addToplayList, deleteSongs } from "../../Model/model.js";
import { loadSong, playSong, updateState } from "./ControlController.js";
import popupAddPlayList from "../../View/popupAdd.js";
import { controlCreatePlayList } from "./PopupPlayListController.js";
import { modelGetAllPlaylistName } from "../../Model/playlistModel.js";

// remove
// addToPlayList
// play-next

export const controlHideCrudContainer = () => {
  CrudView.hide();
};

export const controlRenderCrudAddToBtnCreatedPlaylists = () => {
  console.log("hello");
  const playlistNames = modelGetAllPlaylistName();
  console.log(playlistNames);

  CrudView.renderAddPlayBtnList(playlistNames);
};

function controlCrud(action, value, playlistName) {
  console.log(action, value);
  if (action === "remove") deleteSongs(value);

  if (action === "add-to-playlist") controlRenderCrudAddToBtnCreatedPlaylists();

  if (action === "create-playlist") {
    popupAddPlayList.showPopupAndAddSongs(value);
  }

  if (action === "select-playlist") {
    controlCreatePlayList(playlistName, value);
  }

  if (action === "play-next") {
    addToplayList("my-next-list", null, value);
    updateState({ playMode: "next" });
    loadSong(state.index);
    playSong();
  }
}

CrudView.handleCrud(controlCrud);
