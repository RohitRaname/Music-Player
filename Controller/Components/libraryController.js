import LibraryView from "../../View/LibraryView.js";
import { controlPlayer, playSong } from "./ControlController.js";
import { getSongsSortBy, state } from "../../Model/model.js";

function controlLibrary(action, sortBy) {
  if (action === "shuffle") {
    controlPlayer("shuffle", null, true);
    playSong();
    

    console.log(state)
  }


  if (action === "sort") {
    const sortSongs = getSongsSortBy(sortBy);
    LibraryView.render(sortSongs);
  }
}

LibraryView.addhandleLibrary(controlLibrary);
