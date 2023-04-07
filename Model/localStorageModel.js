import { state as stateObj } from "./model.js";

export const localGetState = () => JSON.parse(localStorage.getItem("state"));

export const localSetState = (state) =>
  localStorage.setItem("state", JSON.stringify(state));

const localRemoveState = () => localStorage.removeItem("state");

const localLoadState = () => {
  let state = localGetState();
  if (state) state = stateObj;

  localGetState(state);
};
