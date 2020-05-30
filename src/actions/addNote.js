import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import * as utils from "../utils";

export const addNote = (notebookId, noteId, owner, content = "") => async (
  dispatch
) => {
  const db = firebase.firestore();
  const notebookRef = db.collection("notebooks").doc(notebookId);
  const now = new Date();
  const title = content ? utils.getNoteTitle(content) : "";
  let notes = [];
  const newNote = {
    id: noteId,
    createdTime: now,
    lastModifiedTime: now,
    content: content,
    owner: owner,
    title: title,
  };
  notebookRef.get().then((snapShot) => {
    notes = snapShot.data().notes;
    notes.push(newNote);
    notebookRef.update({
      lastModifiedTime: now,
      notes: notes,
    });
  });
};
