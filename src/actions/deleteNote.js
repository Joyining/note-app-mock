import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { DELETE_NOTE } from "./types";

export const deleteNote = (noteId) => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(noteId);

  dispatch({
    type: DELETE_NOTE,
    isDeletingNote: true,
  });

  ref.delete().then(() => {
    console.log("delete data success");
  });
};
