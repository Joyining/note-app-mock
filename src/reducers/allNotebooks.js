import { FETCH_NOTEBOOKS } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_NOTEBOOKS:
      return action.allNotebooks;
    default:
      return state;
  }
};
