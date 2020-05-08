import { UPDATE_EDITING_NOTE } from "../actions/types";
import { FETCH_NOTES } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EDITING_NOTE:
      return action.isEditing;
    case FETCH_NOTES:
      return action.isEditing;
    default:
      return state;
  }
};
