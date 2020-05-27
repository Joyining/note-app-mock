import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import * as utils from "../utils";

export const addNote = (noteId, owner, notebook, content = "") => async (
  dispatch
) => {
  const db = firebase.firestore();
  const noteRef = db.collection("notes").doc(noteId);
  const notebookRef = db.collection("notebooks").doc(notebook.id);
  const now = new Date();
  let notes = null;
  let title = content ? utils.getNoteTitle(content) : "";
  noteRef.set({
    createdTime: now,
    lastModifiedTime: now,
    content: content,
    owner: owner,
    notebookId: notebook.id,
    notebookName: notebook.name,
    title: title,
  });
  notebookRef.get().then((snapshot) => {
    notes = snapshot.data().notes;
    notes.push(noteId);
    notebookRef.update({
      notes: notes,
      lastModifiedTime: now,
    });
  });
};
