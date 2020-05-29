import { DELETE_NOTE, FETCH_DATA } from "../actions/types";
export default (state = {}, action) => {
  console.log(action.type);
  switch (action.type) {
    case DELETE_NOTE:
    case FETCH_DATA:
      return action.isDeletingNote;
    default:
      return state;
  }
};
