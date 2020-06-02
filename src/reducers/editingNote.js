import {
  UPDATE_EDITING_NOTE,
  FETCH_DATA,
  FILTER_NOTES,
  ADD_NOTE,
} from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EDITING_NOTE:
    case ADD_NOTE:
      return action.editingNote;
    case FETCH_DATA:
    case FILTER_NOTES:
      return action.firstNote;
    default:
      return state;
  }
};
