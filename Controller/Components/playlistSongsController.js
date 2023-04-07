import PlaylistView from "../../View/playlistSongs.js";
import { loadSong, playSong, updateState } from "./ControlController.js";
import { state, addToplayList } from "../../Model/model.js";
import PlaylistSongView from "../../View/playlistSongs.js";
import { removePlaylistSongs, getPlaylist } from "../../Model/playlistModel.js";

export const controlRenderPlaylistHeader = (name) => {
  const playlist = getPlaylist(name);
  PlaylistSongView._renderHeader(playlist, true);
};

export const controlRenderPlaylist = (playlist) =>
  PlaylistView.render(playlist);

export const controlPlaySongFromCurrentPlaylist = (playlistName, songIndex) => {
  const playlist = getPlaylist(playlistName);
  updateState({ playMode: "my-song" ,currentMyPlaylistPlaying:playlist});
  loadSong(songIndex, {}, );
  playSong();
};

const controlPlaylistItemBtns = (action, playlistName, songIndex) => {
  if (action === "play") {
    controlPlaySongFromCurrentPlaylist(playlistName, songIndex);
  }
};

const controlPlaylistCrudBtns = (action, playlistName, songIndexArr) => {
  console.log(action, playlistName, songIndexArr);
  if (action === "remove") removePlaylistSongs(playlistName, songIndexArr);

  if (action === "play") {
    updateState({ playMode: "next", playUntilNextPlaylistExhaust: true });
    addToplayList("songsToPlayNext", null, songIndexArr);
    loadSong(0);
    playSong();
  }
  // setState(state);
  console.log(state);
};

const controlHeaderBtns = (action, playlistName, songIndex) => {
  if (action === "play") controlPlaySongFromCurrentPlaylist(playlistName, songIndex);
};

PlaylistView.addHandlerPlaylistItemsBtns(controlPlaylistItemBtns);
PlaylistView.addHandlerCrudOperationBtns(controlPlaylistCrudBtns);
PlaylistView.addHandlerHeaderBtns(controlHeaderBtns);
