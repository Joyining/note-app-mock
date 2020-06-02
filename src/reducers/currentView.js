import { SWITCH_VIEW } from "../actions/types";
import { DELETE_NOTEBOOK } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case SWITCH_VIEW:
    case DELETE_NOTEBOOK:
      return action.view;
    default:
      return state;
  }
};
