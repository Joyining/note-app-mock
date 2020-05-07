import { combineReducers } from "redux";
import allNotes from "./allNotes";
import editingNote from "./editingNote";
export default combineReducers({
  allNotes,
  editingNote,
});
// The redux library contains a function named combineReducers that cantake multiple reducers and combine them into one reducer.
