import {
  SWITCH_VIEW,
  DELETE_NOTEBOOK,
  ADD_NOTE,
  DELETE_NOTE,
} from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case SWITCH_VIEW:
    case DELETE_NOTEBOOK:
    case ADD_NOTE:
    case DELETE_NOTE:
      return action.view;
    default:
      return state;
  }
};
