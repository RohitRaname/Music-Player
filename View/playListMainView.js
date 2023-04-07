import ParentView from "./ParentView.js";
import LibraryView from "./LibraryView.js";
import { closest } from "../utils/_domFunction.js";

class playListMainView extends ParentView {
  _sectionEl = document.querySelector(".section-playlist");
  _parentEl = this._sectionEl.querySelector(".card__list");
  _addPlaylistBtn = this._sectionEl.querySelector(
    ".btn[data-action='create-playlist']"
  );
  _addPlaylistPopup = document.querySelector(".popup__add ");
  _playlistListsEl = this._sectionEl.querySelector(".card__list");

  constructor() {
    super();
    this._addPlaylist();
  }

  _generateItemMarkUp(mov) {
    if (mov.name && mov.songs.length === 0)
      return this._onlyPlaylistMarkUp(mov);

    return this._playlistWithSongsMarkUp(mov);
  }

  _onlyPlaylistMarkUp(mov) {
    // to have identifier in data attribute like belongto => main,library,playlist
    return `<li class="card"  data-belong-to="playlist" data-name=${mov.name} data-item=0>
                    <div class="card__controls hidden">
                        <div class="card__control" data-action="setting" >
                          <i class="card__control-icon fa fa-ellipsis-h"></i>

                          <ul class="nav__list card__settings">
                           
                            <li class="nav__item" data-action="remove" data-belong-to="playlist">Remove</li>
                          </ul>
                        </div>
               
                  </div>

                <div class="card__collage card__single">
                      <img
                        id="currentPhoto"
                        src="img/default.jpg"
                        class="card__img card__single "
                        onerror="this.onerror=null; this.src='img/default.jpg'"
                        alt=""
                        />
                </div>
                <p class="card__name">${mov.name}</p>
                <p class="card__artist">${mov.songs.length} item</p>
            </li>`;
  }

  _playlistWithSongsMarkUp(mov) {
    return `<li class="card" data-belong-to="playlist" data-index=${
      mov.songs[0].index
    } data-name=${mov.name} data-item=1>
                <div class="card__controls hidden">
                <div class="card__control" data-action="setting" >
                  <i class="card__control-icon fa fa-ellipsis-h"></i>

                  <ul class="nav__list card__settings">
             
                    <li class="nav__item" data-action="remove" data-belong-to="playlist">Remove</li>
                  </ul>
                </div>
          

            </div>

                <div class="card__collage">
                    ${mov.songs
                      ?.map((song, i) => {
                        if (i === 4) return "";
                        return `<img
                                  id="currentPhoto"
                                  src="img/${song.img}"
                                  class="card__img card__collage-img"
                                  onerror="this.onerror=null; this.src='img/default.jpg'"
                                  alt=""
                                  />`;
                      })
                      .join("")}
                </div>
                  <p class="card__name">${mov.name}</p>
                  <p class="card__artist">${mov.songs.length} item</p>
              </li>`;
  }

  // ////////////////////////////////////////////////////
  // FUNCTIONALITY

  _addPlaylist() {
    this._addPlaylistBtn.addEventListener("click", () => {
      this._addPlaylistPopup.classList.remove("hidden");
    });
  }

  _showPlaylistSongs(target, handle) {
    const playlist = closest(target, "card");
    const { name } = playlist.dataset;
    handle(name);
  }

  _addHandlerShowPlaylistSongs(handle) {
    this._playlistListsEl.addEventListener("click", (e) => {
      // const target  = e.target;
      // // card is clicked
      // this._showPlaylistSongs(target,handle);
      // card is remove
    });
  }
}

export default new playListMainView();
