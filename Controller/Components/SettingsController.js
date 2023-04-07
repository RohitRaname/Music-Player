import SettingView from "../../View/SettingView.js";
import { updateState } from "./ControlController.js";
import { state } from "../../Model/model.js";

export const controlChangeTheme = (theme) => {
  updateState({ theme });
  // ReRender whole app
};

const controlSettings = (action, value) => {
  console.log(action, value);
  if (action === "change-theme") controlChangeTheme(value);
};

SettingView.addHandlerSettings(controlSettings);
