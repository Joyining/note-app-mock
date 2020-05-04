import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_NOTES, UPDATE_EDITING_NOTE } from "./types";

export const addNote = (noteId, newNote) => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(noteId);
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
export const fetchNotes = () => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes");

  ref.onSnapshot((querySnapshot) => {
    console.log(querySnapshot);
    dispatch({
      type: FETCH_NOTES,
      payload: querySnapshot.docs,
    });
  });
};

export const updateEditingNote = (noteId) => async (dispatch) => {
  dispatch({
    type: UPDATE_EDITING_NOTE,
    noteId: noteId,
  });
};
