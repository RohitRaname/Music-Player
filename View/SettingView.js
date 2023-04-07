import { addClass, closest, removeClass } from "../utils/_domFunction.js";
import ParentView from "./ParentView.js";

class SettingView extends ParentView {
  _sectionEl = document.querySelector(".section-setting");
  _parentEl = document.querySelector(".setting__content");

  // addHandlerSettings() ************************

  render(){
    this._toggleSectionHiddenClass()
  }


  _setSettingElTextValue(optionEl, optionElValue) {
    const settingElTextValue = optionEl
      .closest(".setting__item")
      .querySelector(".setting__value");

    settingElTextValue.textContent = optionElValue;
    settingElTextValue.dataset.value = optionElValue;
  }

  _getAllOptionsEl(optionEl) {
    return [
      ...optionEl
        .closest(".setting__dropdown")
        .querySelectorAll(".setting__dropdown-item"),
    ];
  }

  _setOptionElAsActiveOnly(optionEl) {
    const allOptionsEl = this._getAllOptionsEl(optionEl);
    for (const el of allOptionsEl) el.dataset.active = "false";
    optionEl.dataset.active = "true";
  }

  _handleChangeTheme(action, optionEl, handle) {
    if (action !== "change-theme") return;
    let { theme } = optionEl.dataset;

    this._setOptionElAsActiveOnly(optionEl);
    this._setSettingElTextValue(optionEl, theme);
    handle(action, theme);
  }

  _toggleSettingElActiveState(target) {
    const settingItem = closest(target, "setting__item");
    if (!settingItem) return false;

    // Common part in all items
    const { active, action } = settingItem.dataset;

    // simply toggle setting item activen state
    settingItem.dataset.active = active === "true" ? "false" : "true";

    // if click el is settingItem option then dont hide it
    if (closest(target, "setting__dropdown-item"))
      settingItem.dataset.active = "true";

    return action;
  }

  addHandlerSettings(handle) {
    this._parentEl.addEventListener("click", (e) => {
      const target = e.target;

      // check if valid item and return item action
      const action = this._toggleSettingElActiveState(target);
      if (!action) return;

      const settingItemOption = closest(target, "setting__dropdown-item");

      if (!settingItemOption) return;

      // TO handle different item
      this._handleChangeTheme(action, settingItemOption, handle);
    });
  }
}

export default new SettingView();
