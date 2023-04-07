import PlayListMainView from "../../View/playListMainView.js";
import { state } from "../../Model/model.js";
import { getPlaylist } from "../../Model/playlistModel.js";
import { controlRenderPlaylist } from "./playlistSongsController.js";

// import playListMainView from "../../View/playListMainView.js";
// import SideBarView from "../../View/SideBarView.js";

export const controlRenderPlaylistMainView = (display = false) => {
  PlayListMainView.render(state.myPlaylist, true, display);
};

export const controlShowPlaylist = (playlistName) => {
  console.log(playlistName);
  const playlist = getPlaylist(playlistName);
  console.log(playlist);
  controlRenderPlaylist(playlist);
};

PlayListMainView._addHandlerShowPlaylistSongs(controlShowPlaylist);
