import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const deleteNote = (noteId) => async (dispatch) => {
  console.log("delete note action");
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(noteId);

  ref.delete().then(() => {
    console.log("delete data successful");
  });
};
