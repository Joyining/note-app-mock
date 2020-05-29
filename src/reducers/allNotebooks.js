import { FETCH_DATA } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.allNotebooks;
    default:
      return state;
  }
};
