import SearchView from "../../View/SearchView.js";
import { modelSearchSongs, findSongByName } from "../../Model/model.js";
import { controlResetEventHandleOfSearchCardList } from "./cardController.js";
import { controlCard } from "./cardController.js";

const controlSearchSongs = (word) => {
  return modelSearchSongs(word);
};

const controlRenderSearchList = (word) => {
  const songs = controlSearchSongs(word);
  SearchView.render(songs);
};

const controlRenderSearchSongs = (name) => {
  console.log(name);
  const songs = findSongByName(name);
  console.log(songs);
  SearchView.renderSearchResultSection(songs);
  controlResetEventHandleOfSearchCardList(controlCard);
};

SearchView.addHandlerSearchSongs(controlRenderSearchList);
SearchView.addHandlerSelectSearchSongs(controlRenderSearchSongs);
// SearchView.addHandlerSelectCard(controlSelectCard);
