import { FILTER_NOTES } from "../actions/types";
import { RENAME_NOTEBOOK } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case FILTER_NOTES:
    case RENAME_NOTEBOOK:
      return action.selectedNotebook;
    default:
      return state;
  }
};
