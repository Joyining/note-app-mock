import { LOG_IN } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.currentUser;
    default:
      return state;
  }
};
