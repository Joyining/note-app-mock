import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import * as utils from "../utils";

export const addNote = (noteId, owner, notebookId, content = "") => async (
  dispatch
) => {
  const db = firebase.firestore();
  const notebookRef = db.collection("notebooks").doc(notebookId);
  const noteRef = notebookRef.collection("notes").doc(noteId);
  const now = new Date();
  let title = content ? utils.getNoteTitle(content) : "";
  noteRef.set({
    createdTime: now,
    lastModifiedTime: now,
    content: content,
    owner: owner,
    title: title,
  });
  notebookRef.update({
    lastModifiedTime: now,
  });
};
