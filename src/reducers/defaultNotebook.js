import { SIGN_UP, SET_AS_DEFAULT_NOTEBOOK, FETCH_DATA } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP:
      return action.defaultNotebook;
    case SET_AS_DEFAULT_NOTEBOOK:
      return action.defaultNotebook;
    case FETCH_DATA:
      return action.defaultNotebook;
    default:
      return state;
  }
};
