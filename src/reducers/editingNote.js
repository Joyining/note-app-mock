import { UPDATE_EDITING_NOTE } from "../actions/types";
import { FETCH_NOTES } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EDITING_NOTE:
      return action;
    case FETCH_NOTES:
      return action.firstNote;
    default:
      return state;
  }
};
