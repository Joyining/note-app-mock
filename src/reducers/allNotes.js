import { FETCH_DATA, FILTER_NOTES } from "../actions/types";
export default (state = {}, action) => {
  // The reducer is actually a function that has two arguments — the initial state and action
  switch (action.type) {
    case FETCH_DATA:
      return action.allNotes;
    case FILTER_NOTES:
      return action.allNotes;
    default:
      return state;
  }
};
// An action is triggered by an app component, which is then goes through all the reducers.
// The reducers check what kind of action was triggered by the component and it suits the reducer, data gets changed.

// The reducer function above checks if the action triggered by the component is of type FETCH_DATA. If it is, then it will update the state of our app with the list of notes that will be fetched by the action.
