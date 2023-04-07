import CardView from "./CardView.js";
import ParentView from "./ParentView.js";

class Overview extends ParentView {
  _sectionEl = document.querySelector(".section-overview");
  _parentEl = document.querySelector(".overview__list");

  render(arr) {
    this._parentEl.innerHTML = "";
    const html = CardView.render(arr, false);

    if (this._sectionEl) this._toggleSectionHiddenClass();
    this._parentEl.insertAdjacentHTML("afterbegin", html);
  }
}

export default new Overview();
