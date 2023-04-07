import ParentView from "./ParentView.js";
import { closest } from "../utils/_domFunction.js";

class SearchView extends ParentView {
  _sectionEl = document.querySelector(".section-searchResults");
  _parentEl = document.querySelector(".search .drop-list");
  _searchEl = document.querySelector(".search");
  _searchInputEl = this._searchEl.querySelector(".search__input");
  _searchResultContainer = this._sectionEl.querySelector(".searchResults");

  _searchResultCardListEl = this._sectionEl.querySelector(".section-searchResults .card__list");
  _searchResultsSongCardEl = [...this._sectionEl.querySelectorAll(".card")];

  _generateItemMarkUp(mov) {
    return `<li class="drop-item nav__item" data-song="${mov.name}">${mov.name} </li>`;
  }

  renderSearchResultSection(song) {
    this._toggleSectionHiddenClass();

    this._searchResultContainer.innerHTML = "";
    const html = `<div class="searchResults">
                  <header class="header">
                    <h3 class="heading-3">Search Results for "${song.name}"</h3>
                    <p class="subheading mg-sm">Albums</p>
                  </header>
                  <div class="section-content">
                    <ul class="card__list">
                      ${this._generateMarkUpSearchSong(song)}
                    </ul>
                  </div>
                </div>`;

    this._searchResultContainer.innerHTML = html;
  }

  _generateMarkUpSearchSong(song) {
    return ` <li class="card" data-index=${song.index} data-music=${song.music} data-belong-to="search">
                <div class="card__controls hidden">
                
                  <div class="card__control" data-action="play">
                    <i class="card__control-icon fa fa-play"></i>
                  </div>
                
                </div>
                <img
                  id="currentPhoto"
                  src="/img/${song.img}"
                  class="card__img card__img--overview"
                  onerror="this.onerror=null; this.src='img/default.jpg'"
                  alt=""
                />
                <p class="card__name card__name--overview">
                  ${song.name}
                </p>
                <p class="card__artist card__artist--overview">
                  ${song.author}
                </p>
            </li>`;
  }

  _showSearches() {
    this._searchEl.dataset.active = "true";
  }

  _hideSearches() {
    this._searchEl.dataset.active = "false";
  }

  _clearInput() {
    this._searchInputEl.value = "";
  }

  addHandlerSearchSongs(handle) {
    this._searchInputEl.addEventListener("input", (e) => {
      const value = e.target.value.trim();
      if (!value || value === "") return this._clearInput();

      handle(value);
      this._showSearches();
    });
  }

  addHandlerSelectSearchSongs(handle) {
    this._parentEl.addEventListener("click", (e) => {
      const target = closest(e.target, "drop-item");
      if (!target) return;

      const { song } = target.dataset;
      handle(song);

      this._hideSearches();
      this._clearInput();
    });
  }

  addHandlerSelectCard(handle) {
   console.log(this._searchResultCardListEl)
    this._searchResultCardListEl.addEventListener("click", (e) => {
      console.log(e)
      const card = closest(e.target, "card");
      if (!card) return;

      const {index} = card.dataset;

      handle("play",index)

    });
  }
}

export default new SearchView();
