import PopupAddPlayList from "../../View/popupAdd.js";
// import SidebarView from "../../View/SearchView.js";
import { controlRenderSidebarPlayList } from "./sidebarController.js";
import {
  state,
  createOnlyPlaylistWithName,
  createPlayListWithSongs,
} from "../../Model/model.js";

import { controlRenderCrudAddToBtnCreatedPlaylists } from "./crudController.js";
import { controlRenderPlaylistMainView } from "./playListMainController.js";

export function controlCreatePlayList(playListName, songsIndexArr = false) {
  if (!playListName) return;

  // CrudView.renderAddPlayBtnList(playListName);

  // console.log(songsIndexArr);

  // if only playlist is created with no song
  if (!songsIndexArr || songsIndexArr?.length === 0)
    createOnlyPlaylistWithName(playListName);

  // when songs are added to playlist

  if (songsIndexArr.length > 0)
    createPlayListWithSongs(playListName, songsIndexArr);

  // localSetState(state);

  controlRenderCrudAddToBtnCreatedPlaylists();
  controlRenderSidebarPlayList();
  controlRenderPlaylistMainView(false);
  // playListMainView.render(state.myPlaylist, true, false);
}

PopupAddPlayList.addhandlerCreatePlaylist(controlCreatePlayList);
