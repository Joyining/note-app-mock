import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { DELETE_NOTE } from "./types";

export const deleteNote = (notebookId, noteId) => async (dispatch) => {
  const db = firebase.firestore();
  const notebookRef = db.collection("notebooks").doc(notebookId);
  const now = new Date();
  let notes = null;
  dispatch({
    type: DELETE_NOTE,
    isDeletingNote: true,
  });

  notebookRef.get().then((snapshot) => {
    notes = snapshot.data().notes;
    let targetNote = null;
    for (let note of notes) {
      if (note.id === noteId) {
        targetNote = note;
      }
    }
    if (targetNote) {
      notes.splice(notes.indexOf(targetNote), 1);
      notebookRef.update({
        notes: notes,
        lastModifiedTime: now,
      });
    }
  });
};
