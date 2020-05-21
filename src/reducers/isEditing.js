import {
  UPDATE_EDITING_NOTE,
  FETCH_NOTES,
  FILTER_NOTES,
} from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EDITING_NOTE:
      return action.isEditing;
    case FETCH_NOTES:
      return action.isEditing;
    case FILTER_NOTES:
      return action.isEditing;
    default:
      return state;
  }
};
