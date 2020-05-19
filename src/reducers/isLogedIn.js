import { LOG_IN, LOG_OUT, SIGN_UP } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.isLogedIn;
    case LOG_OUT:
      return action.isLogedIn;
    case SIGN_UP:
      return action.isLogedIn;
    default:
      return state;
  }
};
