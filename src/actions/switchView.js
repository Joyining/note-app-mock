import { SWITCH_VIEW } from "./types";

export const switchView = (view) => {
  const action = {
    type: SWITCH_VIEW,
    view: view,
  };
  return action;
};
