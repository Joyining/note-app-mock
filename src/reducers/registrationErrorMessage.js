import { REGISTER } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case REGISTER:
      return action.errorMessage;
    default:
      return state;
  }
};
