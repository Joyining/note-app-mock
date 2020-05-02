import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_NOTES } from "./types";

export const addNote = (newNote) => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes").doc();
  ref.set(newNote);
  console.log("add note !!!!");
};
export const completeNote = (completeNote) => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(completeNote);

  ref.delete().then(() => {
    console.log("delete data successful");
  });
};
// 沒有監聽到資料新增或刪除事件
export const fetchNotes = () => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes");

  ref.get().then((querySnapshot) => {
    console.log(querySnapshot);
    dispatch({
      type: FETCH_NOTES,
      payload: querySnapshot.docs,
    });
  });
};
