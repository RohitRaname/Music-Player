import { contains } from "../utils/_domFunction.js";

class NavView {
  navListArr = [...document.querySelectorAll(".nav__list")];

  handleNav() {
    for (const nav of this.navListArr) {
      nav.addEventListener("click", function (e) {
        let target = e.target;
        target = target.closest("li");
        if (!target) return;
        const list = [...this.querySelectorAll("li")];

        //   set active item
        // if (contains(target, "nav__item--active")) return;
        // setActiveElInArr(list, target, "nav__item--active");

        list.forEach((mov) => {
          mov.classList.remove("nav__item--active");

          target.classList.add("nav__item--active");
        });
      });
    }
  }
}

export default NavView;
