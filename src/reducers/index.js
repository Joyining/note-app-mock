import { combineReducers } from "redux";
import allNotes from "./allNotes";
import allNotebooks from "./allNotebooks";
import editingNote from "./editingNote";
import isEditing from "./isEditing";
import currentView from "./currentView";
import isLogedIn from "./isLogedIn";
import currentUser from "./currentUser";
import registrationErrorMessage from "./registrationErrorMessage";
import defaultNotebook from "./defaultNotebook";
import selectedNotebook from "./selectedNotebook";
import isDeletingNote from "./isDeletingNote";
import { LOG_OUT } from "../actions/types";
const appReducer = combineReducers({
  allNotes,
  allNotebooks,
  editingNote,
  isEditing,
  currentView,
  isLogedIn,
  currentUser,
  registrationErrorMessage,
  defaultNotebook,
  selectedNotebook,
  isDeletingNote,
});
// The redux library contains a function named combineReducers that cantake multiple reducers and combine them into one reducer.

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === LOG_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
