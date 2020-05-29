import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FILTER_NOTES } from "./types";

export const filterNotes = (owner, notebookId = "") => async (dispatch) => {
  const db = firebase.firestore();
  const notebooksRef = db.collection("notebooks");
  let selectedNotebookName = "";
  let selectedNotebookNotes = null;
  let selectedNotebookLastModifiedTime = null;
  let allNotes = [];

  if (notebookId) {
    notebooksRef
      .doc(notebookId)
      .get()
      .then((snap) => {
        selectedNotebookName = snap.data().name;
        selectedNotebookNotes = snap.data().notes;
        selectedNotebookLastModifiedTime = snap.data().lastModifiedTime;
        allNotes = snap.data().notes;
        allNotes.map((note) => {
          note.notebookId = notebookId;
          note.notebookName = snap.data().name;
        });
        allNotes = allNotes.sort((noteA, noteB) => {
          return noteB.lastModifiedTime - noteA.lastModifiedTime;
        });
        // need to refactor
        dispatch({
          type: FILTER_NOTES,
          allNotes: allNotes,
          firstNote: allNotes[0],
          isEditing: false,
          selectedNotebook: {
            id: notebookId,
            name: selectedNotebookName,
            notes: selectedNotebookNotes,
            lastModifiedTime: selectedNotebookLastModifiedTime,
          },
        });
      });
  } else {
    notebooksRef
      .where("owner", "==", owner)
      .get()
      .then((snap) => {
        for (let notebook of snap.docs) {
          let newNotes = notebook.data().notes;
          allNotes = allNotes.concat(newNotes);
          allNotes.map((note) => {
            note.notebookId = notebook.id;
            note.notebookName = notebook.data().name;
          });
          allNotes = allNotes.sort((noteA, noteB) => {
            return noteB.lastModifiedTime - noteA.lastModifiedTime;
          });
        }
        // need to refactor
        dispatch({
          type: FILTER_NOTES,
          allNotes: allNotes,
          firstNote: allNotes[0],
          isEditing: false,
          selectedNotebook: {
            id: notebookId,
            name: selectedNotebookName,
            notes: selectedNotebookNotes,
            lastModifiedTime: selectedNotebookLastModifiedTime,
          },
        });
      });
  }
};
