"use strict";

import ControlView from "../../View/ControlView.js";
import { state, getSongsSortBy } from "../../Model/model.js";
import { modelGetCurrentPlaylistSong } from "../../Model/playlistModel.js";
import { controlPlaySongFromCurrentPlaylist } from "./playlistSongsController.js";

function getSong(index) {
  let song = state.songs[index];

  const playMode = state.playMode;
  console.log(playMode);
  // if (playMode === "main") song = song;
  if (playMode === "my-song" && state.currentMyPlaylistPlaying) {
    song = controlGetMyPlaylistSong(index);

    if (song === null || !song) return;
  }
  if (playMode === "next") song = getNextPlayListSong();
  if (playMode === "shuffle") song = state.shuffleSongs[index];

  return song;
}

function loadSong(index, options = {}) {
  // mode=>>>> main,next,my-song,shuffle

  const song = getSong(index);
  if (!song) return pauseSong();

  if (state.playMode !== "shuffle") options.toggle = "shuffle";
  // if (state.playMode === "shuffle") options.setShuffle = "on";

  ControlView.loadSong(song, options);
}

function resetSong() {
  loadSong(state.index, { currentTime: 0 });
  playSong();
}

function shuffleSong(mode = false) {
  if (mode) state.playMode = "shuffle";
  else state.playMode = "main";

  if (mode) {
    state.shuffleSongs = state.songs
      .slice()
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  } else {
    state.shuffleSongs = [];
  }
}

function playSong(playlistName) {
  
  state.isPlaying = true;

  if (playlistName) return controlPlaySongFromCurrentPlaylist(playlistName, 0);

  // checking if we are in playlist section
  if (state.playUntilNextPlaylistExhaust === "true" && playMode === "next")
    return ControlView.playSong();

  ControlView.playSong();
}

function getNextPlayListSong() {
  if (!state.songsToPlayNext) {
    return false;
  }

  state.songsToPlayNext = state.songsToPlayNext.filter(
    (mov) => mov.played === false
  );

  const leftSongs = state.songsToPlayNext;

  if (!leftSongs || leftSongs.length === 0) {
    state.playMode = "main";
    return state.songs[state.index];
  }
  if (leftSongs.length > 0) {
    const song = leftSongs[0];
    song.played = true;

    return song;
  }
}

function controlGetMyPlaylistSong(index) {
  // songs => [1playlist,2ndplaylist,...]

  const song = modelGetCurrentPlaylistSong(index);
  if (!song) return;
  return song;
}

function pauseSong() {
  state.isPlaying = false;
  ControlView.pauseSong();
}

function nextSong() {
  state.isPlaying = true;
  let index = +state.index;
  index = index + 1;

  if (index > state.songs.length - 1) index = 0;
  state.index = index;

  loadSong(index);
  playSong();
}
function prevSong() {
  state.isPlaying = true;
  let index = +state.index;
  index = index - 1;

  if (index < 0) index = state.songs.length - 1;
  state.index = index;
  loadSong(index);
  playSong();
}

function updateState(obj) {
  if (!obj || obj === null || obj === undefined) return;
  const objKeyValuePair = Object.entries(obj);

  // console.log(state)
  for (const [key, value] of objKeyValuePair) {
    state[key] = value;
  }
}

function controlPlayer(action, updateObj, option, playlistName) {
  updateState(updateObj);

  if (action === "play") {
    playSong(playlistName);
  }

  if (action === "pause") {
    pauseSong();
  }

  if (action === "next") nextSong();
  if (action === "prev") prevSong();

  if (action === "reset") resetSong();
  if (action === "shuffle") shuffleSong(option);
  // mean song has ended play next song
  if (action === "ended") {
    // Play song from songToPlay playlist

    nextSong();

    // song to play directly from main stream
  }
}

function controlDisableSongChangeBtns(type) {
  ControlView.disableSongChangeBtns(type);
}
function controlEnableSongChangeBtns(type) {
  ControlView.enableSongChangeBtns(type);
}

// handle all control like pause next prev volume up playback rate fast
ControlView.addHandlerControl(controlPlayer);
ControlView.autoPlayNextSong(controlPlayer);

export {
  loadSong,
  playSong,
  prevSong,
  nextSong,
  updateState,
  controlPlayer,
  controlEnableSongChangeBtns,
  controlDisableSongChangeBtns,
};

//  main,next,my-song,shuffle
