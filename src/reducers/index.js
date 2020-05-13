import { combineReducers } from "redux";
import allNotes from "./allNotes";
import editingNote from "./editingNote";
import isEditing from "./isEditing";
import currentView from "./currentView";
export default combineReducers({
  allNotes,
  editingNote,
  isEditing,
  currentView,
});
// The redux library contains a function named combineReducers that cantake multiple reducers and combine them into one reducer.
