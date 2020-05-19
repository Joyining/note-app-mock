import { LOG_IN, SIGN_UP } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.errorMessage;
    case SIGN_UP:
      return action.errorMessage;
    default:
      return state;
  }
};
