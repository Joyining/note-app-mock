import {
  UPDATE_EDITING_NOTE,
  FETCH_NOTES,
  FILTER_NOTES,
} from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EDITING_NOTE:
      return action;
    case FETCH_NOTES:
      return action.firstNote;
    case FILTER_NOTES:
      return action.firstNote;
    default:
      return state;
  }
};
