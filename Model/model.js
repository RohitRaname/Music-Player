import { localGetState } from "./localStorageModel.js";

let state = {
  index: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,

  // four mode available => main,next,my-song,shuffle
  playMode: "main",
  playUntilNextPlaylistExhaust: false,

  songs: [
    {
      name: "the cooler guard",
      author: "Mine the way",
      img: "1.jpg",
      music: "1.mp3",
      index: 1,
    },
    {
      name: "the wonder galaxy",
      author: "Zero to Zero->Infinity",
      img: "2.jpg",
      music: "2.mp3",
      index: 2,
    },
    {
      name: "Way of my life",
      author: "The serial me",
      img: "3.jpg",
      music: "3.mp3",
      index: 3,
    },
    {
      name: "we are puching back",
      author: "loki",
      img: "4.jpg",
      music: "4.mp3",
      index: 4,
    },
    {
      name: "Under the house",
      author: "Rohit me",
      img: "5.jpg",
      music: "5.mp3",
      index: 5,
    },
    {
      name: "Consistency is the key",
      author: "Ithink so",
      img: "6.jpg",
      music: "6.mp3",
      index: 6,
    },
    {
      name: "Soniis puppy",
      author: "creator",
      img: "7.jpg",
      music: "7.mp3",
      index: 7,
    },
    {
      name: " puppy",
      author: "tyler",
      img: "8.jpg",
      music: "8.mp3",
      index: 8,
    },
    {
      name: "do everydat",
      author: "me the great",
      img: "9.jpg",
      music: "9.mp3",
      index: 9,
    },
    {
      name: "this is what we are ",
      author: "waiting",
      img: "10.jpg",
      music: "10.mp3",
      index: 10,
    },
    {
      name: "monet",
      author: "isGreat",
      img: "11.jpg",
      music: "11.mp3",
      index: 11,
    },
    {
      name: "hand recovery",
      author: "must happen",
      img: "12.jpg",
      music: "12.mp3",
      index: 12,
    },
    {
      name: "yes i am",
      author: "the beast",
      img: "13.jpg",
      music: "13.mp3",
      index: 13,
    },
    {
      name: "who i am",
      author: "the one",
      img: "14.jpg",
      music: "14.mp3",
      index: 14,
    },
    {
      name: "anime",
      author: "is great yep",
      img: "15.jpg",
      music: "15.mp3",
      index: 15,
    },
  ],
  songsToPlayNext: [],

  currentMyPlaylistPlaying: {},
  myPlaylist: [],

  shuffleSongs: [],
  volume: 1,
  speed: 1,
  theme: "dark",
  fullScreen: false,
};

// main db
function deleteSong(index) {
  state.songs = state.songs.filter(
    (mov) => Number(mov.index) !== Number(index)
  );
}

function sortBy(arr, type) {
  return arr.sort((a, b) => {
    if (a[type].slice(0, 1).toLowerCase() > b[type].slice(0, 1).toLowerCase())
      return 1;
    if (b[type].slice(0, 1).toLowerCase() < a[type].slice(0, 1).toLowerCase())
      return -1;
    else return 0;
  });
}

function getSongsSortBy(type) {
  const songsCopy = state.songs.slice();
  return sortBy(songsCopy, type);
}

function deleteSongs(arrofIndex) {
  state.songs = state.songs.filter((mov) => {
    if (!arrofIndex.includes(mov.index.toString())) return mov;
  });
}

function createSong(songObj) {
  state.push(songObj);
}

function updateSong(song) {
  state.songs = state.songs.map((mov) => {
    if (Number(mov.index) === song.index) return song;
    return mov;
  });
}

// addSongToPlaylist
// addSongsToPlaylist
// playList db
function addToplayList(listType, index, indexArr) {
  let list;
  if (listType === "my-list") list = "myPlaylist";
  else list = "songsToPlayNext";

  if (index) {
    const song = state.songs.find((mov) => Number(mov.index) === Number(index));
    song.played = false;
    state[list].push(song);
  }

  if (indexArr) {
    const songs = state.songs.filter((mov) => {
      if (indexArr.includes(mov.index.toString())) {
        mov.played = false;
        return mov;
      }
    });

    state[list].push(...songs);
  }
}

function deleteSongFromPlayList(listType, index) {
  let list;
  if (listType === "my-list") list = "myPlayList";
  else list = "songsToPlayNextList";

  if (!list || !Array.isArray(list)) return;
  list = state[list];

  list = list.filter(
    (mov) =>
      state.songs.find((mov) => Number(mov.index) === Number(index)) ===
      mov.name
  );
}

function findSongsByIndex(arr) {
  let songs = [];
  arr.forEach((index) => {
    for (const song of state.songs) {
      if (Number(song.index) === Number(index) + 1) songs.push(song);
    }
  });

  return songs;
}

function findSongByName(name) {
  return state.songs.find((mov) => mov.name === name);
}

function findPlaylist(name) {
  return state.myPlaylist.filter((mov) => mov.name === name);
}

function createOnlyPlaylistWithName(name) {
  const timesExist = findPlaylist(name);

  if (timesExist.length > 0) name = `${name} Copy ${timesExist.length + 1}`;

  state.myPlaylist.push({
    curSongIndex: 0,
    name,
    songs: [],
    createAt: Date.now(),
  });
}

function createPlayListWithSongs(playlistName, songsIndexArr) {
  if (!songsIndexArr) return;

  let playListExist = state.myPlaylist.find((mov) => mov.name === playlistName);

  // if playlist with this name already exists then replace it
  const songs = findSongsByIndex(songsIndexArr);

  if (playListExist) return playListExist.songs.push(...songs);

  const playlistObj = {
    curSongIndex: 0,

    name: playlistName,
    songs: songs,
    createAt: Date.now(),
  };

  state.myPlaylist.push(playlistObj);
}

const modelUpdateState = () => {
  state = localGetState();
};

export const modelSearchSongs = (word) => {
  let songs = [];
  for (const song of state.songs)
    if (song.name.toLocaleLowerCase().includes(word.toLowerCase()))
      songs.push(song);
  return songs;
};

export {
  state,
  modelUpdateState,
  deleteSong,
  deleteSongs,
  updateSong,
  addToplayList,
  deleteSongFromPlayList,
  getSongsSortBy,
  findSongsByIndex,
  findSongByName,
  createOnlyPlaylistWithName,
  createPlayListWithSongs,
};
