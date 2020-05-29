import {
  UPDATE_EDITING_NOTE,
  FETCH_DATA,
  FILTER_NOTES,
} from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EDITING_NOTE:
      return action.editingNote;
    case FETCH_DATA:
      return action.firstNote;
    case FILTER_NOTES:
      return action.firstNote;
    default:
      return state;
  }
};
