import { LOG_IN, SIGN_UP } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.currentUser;
    case SIGN_UP:
      return action.currentUser;
    default:
      return state;
  }
};
