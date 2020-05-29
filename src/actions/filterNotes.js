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
        if (allNotes) {
          allNotes = allNotes.map((note) => {
            const newNote = {
              ...note,
              notebookId: notebookId,
              notebookName: snap.data().name,
            };
            return newNote;
          });
          allNotes = allNotes.sort((noteA, noteB) => {
            return noteB.lastModifiedTime - noteA.lastModifiedTime;
          });
        }
        // need to refactor
        dispatch({
          type: FILTER_NOTES,
          allNotes: allNotes,
          firstNote: allNotes[0] ? allNotes[0] : {},
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
          if (newNotes.length > 0) {
            allNotes = allNotes.map((note) => {
              const newNote = {
                ...note,
                notebookId: notebook.id,
                notebookName: notebook.data().name,
              };
              return newNote;
            });
            allNotes = allNotes.sort((noteA, noteB) => {
              return noteB.lastModifiedTime - noteA.lastModifiedTime;
            });
          }
        }
        // need to refactor
        dispatch({
          type: FILTER_NOTES,
          allNotes: allNotes,
          firstNote: allNotes[0] ? allNotes[0] : {},
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
