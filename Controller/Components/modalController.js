import ModalView from "../../View/ModalView.js";
import {
  modelRenamePlaylist,
  removePlaylist,
} from "../../Model/playlistModel.js";
import {
  controlRenderPlaylistHeader,
  controlRenderPlaylist,
} from "./playlistSongsController.js";

import { controlRenderSidebarPlayList } from "./sidebarController.js";
import { controlRenderCrudAddToBtnCreatedPlaylists } from "./crudController.js";
import { controlRenderPlaylistMainView } from "./playListMainController.js";

const controlRenamePlaylist = (oldName, newName) => {
  modelRenamePlaylist(oldName, newName);
  controlRenderPlaylistHeader(newName);
};

const controlDeletePlaylist = (name) => {
  removePlaylist(name);
  controlRenderPlaylist(undefined);
};

const controlModalBtns = (action, currentPlaylistName, newPlaylistName) => {
  if (action === "rename")
    controlRenamePlaylist(currentPlaylistName, newPlaylistName);

  if (action === "delete") {
    controlDeletePlaylist(currentPlaylistName);
    controlRenderPlaylistMainView(true);
    controlRenderCrudAddToBtnCreatedPlaylists();
    controlRenderSidebarPlayList();
  }
};
ModalView.addHandleModalBtns(controlModalBtns);
