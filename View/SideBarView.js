import { contains, closest, findActiveElInArr } from "../utils/_domFunction.js";

class SidebarView {
  _sideNav = document.querySelector(".sidebar__list");
  _navElArr = [...document.querySelectorAll(".sidebar__item")];
  _playListEl = this._sideNav.querySelector(".sidebar__item-options");
  _playlistItemEl = document.querySelector(".sidebar__item--playlist");

  renderSidebarItemOptions(arr) {
    this._playListEl.innerHTML = "";

    const html = arr
      .map(
        (name) => ` <li
                    class="nav__item sidebar__item-option"
                    data-action="select"   data-playlist-name=${name}
                  >
                  
                    <div class="nav__title">${name}</div>
                  </li>`
      )
      .join("");

    this._playListEl.insertAdjacentHTML("afterbegin", html);
  }

  hideSidebarPlaylistItems() {
    this._playlistItemEl.dataset.state = "open";
  }

  addHandleSideNav(handle) {
    this._sideNav.addEventListener("click", function (e) {
      let target = e.target;

      target = target.closest(".nav__item");
      if (!target) return;

      // here we overwrite some css to show the list even if the list item are clicked when parent is not

      // clicked on item options
      if (contains(target, "sidebar__item-option")) {
        const sideBarItemOption = target.closest(".sidebar__item-option");

        const { playlistName } = sideBarItemOption.dataset;

        handle("selected-playlist", playlistName);

        target = target.closest(".sidebar__item");

        sideBarItemOption.classList.add("nav__item--active");
        target.classList.add("nav__item--showList");

        return;
      }

      // Cliked on item
      if (contains(target, "sidebar__item")) {
        const { section } = target.dataset;
        if (!section || section === undefined) return;

        // CSSS STUFFF ************************************
        let { state } = target.dataset;
        state = state === "open" ? "close" : "open";
        if (state === "close") {
          target.classList.remove("nav__item--active");
          target.classList.remove("nav__item--showList");
        }
        target.dataset.state = state;

        // CONTRROLLER STUFF
        target = closest(target, "nav__item");
        handle(section);
      }
    });
  }
}

export default new SidebarView();
