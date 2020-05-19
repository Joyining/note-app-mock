import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const addNote = (noteId, owner, content = "") => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(noteId);
  ref.set({
    createdTime: new Date(),
    lastModifiedTime: new Date(),
    content: content,
    owner: owner,
  });
  console.log("add note !!!!");
};
