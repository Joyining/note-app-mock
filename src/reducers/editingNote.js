import { UPDATE_EDITING_NOTE } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EDITING_NOTE:
      return action.noteId;
    default:
      return state;
  }
};
