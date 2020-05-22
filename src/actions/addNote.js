import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const addNote = (noteId, owner, notebook, content = "") => async (
  dispatch
) => {
  const db = firebase.firestore();
  const noteRef = db.collection("notes").doc(noteId);
  const notebookRef = db.collection("notebooks").doc(notebook.id);
  let notes = null;
  noteRef.set({
    createdTime: new Date(),
    lastModifiedTime: new Date(),
    content: content,
    owner: owner,
    notebookId: notebook.id,
    notebookName: notebook.name,
  });
  notebookRef.get().then((snapshot) => {
    notes = snapshot.data().notes;
    notes.push(noteId);
    notebookRef.update({
      notes: notes,
    });
  });
};
