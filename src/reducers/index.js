import { combineReducers } from "redux";
import notes from "./notes";
export default combineReducers({
  notes,
});
// The redux library contains a function named combineReducers that cantake multiple reducers and combine them into one reducer.
