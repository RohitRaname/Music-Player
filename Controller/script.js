import Overview from "../View/OverviewView.js";
import { loadSong } from "./Components/ControlController.js";
import { state, } from "./../Model/model.js";
// Set song
Overview.render(state.songs);
loadSong(0);
// modelUpdateState();
// playlistSongs.render(state.myPlaylist[0])
// updateState();
