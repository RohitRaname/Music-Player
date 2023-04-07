import SideBarView from "../../View/SideBarView.js";

import Overview from "../../View/OverviewView.js";
import LibraryView from "../../View/LibraryView.js";
import SettingView from "../../View/SettingView.js";
import { state } from "../../Model/model.js";
import {
  controlShowPlaylist,
  controlRenderPlaylistMainView,
} from "./playListMainController.js";
import { controlHideCrudContainer } from "./crudController.js";
import { controlEnableSongChangeBtns } from "./ControlController.js";

// to handle action on click on card

export const controlHideSidebarPlayiistItems = () =>
  SideBarView.hideSidebarPlaylistItems();

function controlRenderSidebarPlayList() {
  const playlistSongsName = state.myPlaylist.map((mov) => mov.name);
  SideBarView.renderSidebarItemOptions(playlistSongsName);
}

function controlSectionSelection(section, playlistName) {
  controlHideCrudContainer();
  controlEnableSongChangeBtns("both");

  if (section !== "playlist") controlHideSidebarPlayiistItems();

  if (section === "overview") {
    Overview.render(state.songs);
  }

  if (section === "library") {
    LibraryView.render(state.songs);
  }

  if (section === "playlist") {
    controlRenderPlaylistMainView(true);
    const playlistSongs = state.myPlaylist;
    if (!playlistSongs || playlistSongs.length === 0) return;

    const playlistSongsName = state.myPlaylist.map((mov) => mov.name);

    SideBarView.renderSidebarItemOptions(playlistSongsName);
  }

  //
  if (section === "selected-playlist") {
    controlShowPlaylist(playlistName);
  }

  if (section === "setting") SettingView.render();

  // here will be select playlist
}

// To intially render all overview html

SideBarView.addHandleSideNav(controlSectionSelection);

export { controlRenderSidebarPlayList };
