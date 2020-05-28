import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { DELETE_NOTE } from "./types";

export const deleteNote = (noteId) => async (dispatch) => {
  const db = firebase.firestore();
  const noteRef = db.collection("notes").doc(noteId);
  const now = new Date();
  let notebookId = "";
  let notebookRef = null;
  let notes = null;
  dispatch({
    type: DELETE_NOTE,
    isDeletingNote: true,
  });

  noteRef
    .get()
    .then((snapshot) => {
      notebookId = snapshot.data().notebookId;
      notebookRef = db.collection("notebooks").doc(notebookId);
    })
    .then((res) => {
      notebookRef.get().then((snapshot) => {
        notes = snapshot.data().notes;
        notes.splice(notes.indexOf(noteId), 1);
        notebookRef.update({
          notes: notes,
          lastModifiedTime: now,
        });
      });
    })
    .then((res) => {
      noteRef.delete().then(() => {
        console.log("delete data success");
      });
    });
};
