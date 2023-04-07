import ParentView from "./ParentView.js";

class DropListView extends ParentView {
  _allDropListParent = [...document.querySelectorAll(".drop__parent")];
  _allDropList = [...document.querySelectorAll(".drop__list")];

  constructor() {
    super();
    this._showOrHideDropList();
    this._hideDropListWhenLosefocus();
  }

  _generateItemMarkUp(mov) {

    if(!mov) return;
    return `<li class="nav__item drop__item" data-action="select" data-value=${mov}>
            ${mov}
            </li>`;
  }

  _showOrHideDropList() {
    for (const dropListParent of this._allDropListParent)
      dropListParent.addEventListener("click", function (e) {
        this.classList.add("drop__parent--active");

        const target = e.target.closest(".drop__item");
        if (!target) return;

        // if no no more list inside
        this.classList.remove("drop__parent--active");
      });
  }

  _hideDropListWhenLosefocus() {
    const body = document.querySelector("body");
    body.addEventListener("click", (e) => {
      if (!e.target.closest(".drop__parent")) {
        for (const dropParent of this._allDropListParent) {
          dropParent.classList.remove("drop__parent--active");
        }
      }
    });
  }
}

export default new DropListView();
