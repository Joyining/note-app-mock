import { combineReducers } from "redux";
import notes from "./notes";
import editingNote from "./editingNote";
export default combineReducers({
  notes,
  editingNote,
});
// The redux library contains a function named combineReducers that cantake multiple reducers and combine them into one reducer.
