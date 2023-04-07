import { addClass, closest, removeClass } from "../utils/_domFunction.js";
import CardView from "./CardView.js";
import ParentView from "./ParentView.js";

class LibraryView extends ParentView {
  _sectionEl = document.querySelector(".section-library");
  _parentEl = this._sectionEl.querySelector(".library__content");
  _sortList = this._sectionEl.querySelector(".operation__control");
  _operationValueEl = this._sectionEl.querySelector(
    ".operation__control-value"
  );

  _controlShuffleBtn = document.querySelector(
    '.control__btn[data-action="shuffle"]'
  );

  _generateItemMarkUp(mov, i) {
    return ` <div class="library__box" >
                <p class="library__box-index">${mov.name
                  .slice(0, 1)
                  .toUpperCase()}</p>
                <li class="card" data-index=${+mov.index - 1}>
                    <img
                        id="currentPhoto"
                        src="img/${mov.img}"
                        class="card__img"
                        onerror="this.onerror=null; this.src='img/default.jpg'"
                        alt=""
                    />
                    <p class="card__name">${mov.name}</p>
                    <p class="card__artist">${mov.author}</p>
                    
                </li>
            </div>`;
  }

  sortByProperty(target, handle) {
    // Sort Songs
    if (closest(target, "operation__control")) {
      // open sort List
      const sortList = closest(target, "operation__control");
      addClass(sortList, "operation__control--active");

      // Select sort item
      const sortOption = closest(target, "nav__item");
      if (!sortOption) return;

      const { sort } = sortOption.dataset;

      // update Sort By label value
      this._operationValueEl.textContent = sortOption.textContent;

      // Hiding the sort List
      removeClass(sortList, "operation__control--active");

      handle("sort", sort);
    }
  }

  addhandleLibrary(handle) {
    this._sectionEl.addEventListener("click", (e) => {
      let target = e.target;

      // Shuffle song by clicking control
      if (closest(target, 'btn[action="shuffle"]')) {
        target = closest(target, 'btn[action="shuffle"]');
        handle("shuffle");

        this._controlShuffleBtn.classList.toggle("control__btn--active");
      }

      this.sortByProperty(target, handle);
    });
  }
}

export default new LibraryView();
