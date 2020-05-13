import { SWITCH_VIEW } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case SWITCH_VIEW:
      return action.view;
    default:
      return state;
  }
};
