import {
  addClass,
  addClassToArrAllEl,
  contains,
  removeClass,
} from "../utils/_domFunction.js";

class ParentView {
  _parentEl;
  _body = document.querySelector("body");
  _crudSelectedCount = document.querySelector(".crud__selected-items");
  _allSections = [...document.querySelectorAll("section")];
  _sectionControl = document.querySelector(".section-control");
  _sectionSetting = document.querySelector(".section-searchResults");

  getCurrentSection() {
    return this._allSections.find(
      (mov) => !contains(mov, "hidden") && !contains(mov, "section-control")
    );
  }

  _toggleSectionHiddenClass() {
    addClassToArrAllEl(this._allSections, "hidden");
    removeClass(this._sectionEl, "hidden");
    removeClass(this._sectionControl, "hidden");
    // removeClass(this._sectionSetting, "hidden");
  }

  render(arr, render = true, display = true, clearBeforeRender = false) {
    if (this._sectionEl && display) this._toggleSectionHiddenClass();

    if (clearBeforeRender) this._parentEl.innerHTML = "";
    const html = this._generateMarkUpList(arr);

    if (!render) return html;

    this._parentEl.innerHTML = html;
  }

  _generateMarkUpList(arr) {
    return arr.map((mov, i) => this._generateItemMarkUp(mov, i)).join("");
  }

  _generateItemMarkUp(mov) {
    return `something is not good`;
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  removeActiveElement(className) {
    this._body.addEventListener("click", (e) => {});
  }

  updateSelectedCardsCount(changeCount) {
    let count = 0;
    const cardElArr = [...document.querySelectorAll(".card")];

    cardElArr.forEach((mov) => {
      if (mov.querySelector('.card__control--active[data-action="select"]'))
        count++;
    });

    if (changeCount) count = changeCount;
    this._crudSelectedCount.textContent = `${count} item Selected`;
  }
}

export default ParentView;
