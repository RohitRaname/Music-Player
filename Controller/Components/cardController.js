import {
  state,
  addToplayList,
  deleteSong,
  deleteSongFromPlayList,
} from "../../Model/model.js";

import {
  addPlayListSongsToNextPlaylist,
  getPlaylistSongs,
  removePlaylist,
  playlistHasSong,
} from "../../Model/playlistModel.js";

import CardView from "../../View/CardView.js";
import { controlDisableSongChangeBtns } from "./ControlController.js";
import { controlRenderCrudAddToBtnCreatedPlaylists } from "./crudController.js";
import { controlShowPlaylist } from "./playListMainController.js";
import { controlRenderSidebarPlayList } from "./sidebarController.js";
import { playSong, loadSong, updateState } from "./ControlController.js";

export function controlCard(action, songIndex, playlistName, moreOption) {

  if (action === "play") {
    if (!playlistName) {
      updateState({ index: songIndex, isPlaying: true, playMode: "main" });
      loadSong(songIndex, { toggle: "shuffle", playBtn: "play" });
    } else {
      updateState({ playMode: "my-song" });

      const existSongs = playlistHasSong(playlistName);
      if (!existSongs) return;
      loadSong(0, { toggle: "shuffle", playBtn: "play" }, playlistName);
    }
    playSong();
  }

  if (action === "play-next") {
    state.playMode = "next";

    if (!playlistName) addToplayList("next-list", songIndex);
    else addPlayListSongsToNextPlaylist(playlistName);

    // moreOption === forcePlay
    if (moreOption === true) {
      loadSong(songIndex);
      playSong();
      controlDisableSongChangeBtns("both");
    }
  }

  if (action === "remove") {
    if (!playlistName && !moreOption) {
      deleteSong(songIndex);
      deleteSongFromPlayList("my-list", songIndex);
      deleteSongFromPlayList("next-list", songIndex);
    }

    if (playlistName && !moreOption) {
      removePlaylist(playlistName);
    }

    // remove-playlist
    if (moreOption) {
      removePlaylist(playlistName);
      controlRenderCrudAddToBtnCreatedPlaylists();
      controlRenderSidebarPlayList();
      console.log("playlist", state.myPlaylist);
    }
  }

  if(action==="open-playlist") controlShowPlaylist(playlistName)
}

export const controlResetEventHandleOfSearchCardList = (handle) =>
  CardView._resetAddHandlerControlsToSearchCardList(handle);

CardView.addhandlerControls(controlCard);
