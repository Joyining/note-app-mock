import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { UPDATE_EDITING_NOTE } from "./types";

export const updateEditingNote = (notebookId, noteId) => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notebooks").doc(notebookId);
  // ref.get() returns a Promise
  ref.get().then((snapShot) => {
    const notes = snapShot.data().notes;
    let targetNote = null;
    for (let note of notes) {
      if (note.id === noteId) {
        targetNote = note;
      }
    }
    if (targetNote) {
      const editingNote = {
        id: targetNote.id,
        content: targetNote.content,
        title: targetNote.title,
        notebookId: snapShot.id,
        notebookName: snapShot.data().name,
        lastModifiedTime: targetNote.lastModifiedTime,
        createdTime: targetNote.createdTime,
      };
      dispatch({
        type: UPDATE_EDITING_NOTE,
        isEditing: false,
        editingNote: editingNote,
      });
    }
  });
};
