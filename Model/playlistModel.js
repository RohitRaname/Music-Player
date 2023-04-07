import { state } from "./model.js";

export const getPlaylist = (name) => {
  let playlist = state.myPlaylist.find((mov) => mov.name === name);
  return playlist;
};

export const removePlaylist = (name) => {
  state.myPlaylist = state.myPlaylist.filter((mov) => mov.name !== name);
};

export const removePlaylistSongs = (name, songsIndexArr) => {
  const playlist = getPlaylist(name);
  for (const givenIndex of songsIndexArr) {
    playlist.songs = playlist.songs.filter(
      (song) => Number(song.index) !== Number(givenIndex)
    );
  }
};

export const getOnePlaylistSongsName = (name) => {
  let playlist = state.myPlaylist.find((mov) => mov.name === name);
  playlist = playlist[0];
  const playlistSongs = playlist.songs;
  if (!playlistSongs || playlistSongs.length === 0) return;
  return playlistSongs.map((mov) => mov.name);
};

export const getPlaylistSong = (name, index) => {
  let playlist = state.myPlaylist.find((mov) => mov.name === name);
  return playlist.songs.find((mov) => Number(mov.index) === Number(index));
};

export const autoPlayPlaylist = (name) => {
  let playlist = state.myPlaylist.find((mov) => mov.name === name);

  if (!playlist || playlist.songs.length === 0) return;

  const curSongIndex = Number(playlist.curSongIndex);
  const curSong = playlist.songs[curSongIndex];

  playlist.curSongIndex = curSongIndex + 1;
  return curSong;
};

export const getPlaylistSongs = (name) => {
  const playlist = state.myPlaylist.find((mov) => mov.name === name);

  return playlist.songs;
};

export const addPlayListSongsToNextPlaylist = (name) => {
  const songs = getPlaylistSongs(name);
  if (songs.length === 0) return;
  state.songsToPlayNext.push(songs);
};

export const playlistHasSong = (name) => {
  const songs = getPlaylistSongs(name);
  if (songs === [] || !songs || songs.length === 0) return false;
  return true;
};

export const modelRenamePlaylist = (oldName, newName) => {
  const playlist = getPlaylist(oldName);
  console.log(oldName, newName);
  playlist.name = newName;
};

export const modelGetAllPlaylistName = () =>
  state.myPlaylist.map((mov) => mov.name);

export const modelGetCurrentPlaylistSong = (index) => {
  const name = state.currentMyPlaylistPlaying.name;
  return getPlaylistSong(name, index);
};
