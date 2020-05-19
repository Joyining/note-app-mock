import { SIGN_UP, SET_AS_DEFAULT_NOTEBOOK } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP:
      return action.defaultNotebook;
    case SET_AS_DEFAULT_NOTEBOOK:
      return action.defaultNotebook;
    default:
      return state;
  }
};
