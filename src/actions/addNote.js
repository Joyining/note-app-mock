import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const addNote = (noteId, owner, defaultNotebook, content = "") => async (
  dispatch
) => {
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(noteId);
  ref.set({
    createdTime: new Date(),
    lastModifiedTime: new Date(),
    content: content,
    owner: owner,
    notebook: defaultNotebook,
  });
  console.log("add note !!!!");
};
