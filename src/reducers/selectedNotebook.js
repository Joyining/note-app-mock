import { FILTER_NOTES } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case FILTER_NOTES:
      return action.selectedNotebook;
    default:
      return state;
  }
};
