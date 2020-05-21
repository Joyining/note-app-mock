import { DELETE_NOTE, FETCH_NOTES } from "../actions/types";
export default (state = {}, action) => {
  console.log(action.type);
  switch (action.type) {
    case DELETE_NOTE:
    case FETCH_NOTES:
      return action.isDeletingNote;
    default:
      return state;
  }
};
