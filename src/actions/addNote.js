import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const addNote = (noteId, owner, notebook, content = "") => async (
  dispatch
) => {
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(noteId);
  ref.set({
    createdTime: new Date(),
    lastModifiedTime: new Date(),
    content: content,
    owner: owner,
    notebookId: notebook.id,
    notebookName: notebook.name,
  });
  console.log("add note !!!!");
};
