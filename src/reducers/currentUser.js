import { REGISTER } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case REGISTER:
      return action.currentUser;
    default:
      return state;
  }
};
