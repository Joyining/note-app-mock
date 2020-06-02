import { SWITCH_VIEW } from "../actions/types";
import { DELETE_NOTEBOOK } from "../actions/types";
import { ADD_NOTE } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case SWITCH_VIEW:
    case DELETE_NOTEBOOK:
    case ADD_NOTE:
      return action.view;
    default:
      return state;
  }
};
