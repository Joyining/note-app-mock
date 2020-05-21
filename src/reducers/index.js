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
export default combineReducers({
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
});
// The redux library contains a function named combineReducers that cantake multiple reducers and combine them into one reducer.
