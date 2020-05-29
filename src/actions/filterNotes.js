import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FILTER_NOTES } from "./types";
import * as utils from "../utils";

export const filterNotes = (owner, notebookId = "") => async (dispatch) => {
  const db = firebase.firestore();
  const notebooksRef = db.collection("notebooks");
  let selectedNotebookName = "";
  let selectedNotebookNotes = null;
  let selectedNotebookLastModifiedTime = null;
  let allNotes = [];

  // const notebooksCollection = notebooksRef
  //   .where("owner", "==", owner)
  //   .orderBy("lastModifiedTime", "desc");

  if (notebookId) {
    notebooksRef
      .doc(notebookId)
      .get()
      .then((snap) => {
        selectedNotebookName = snap.data().name;
        selectedNotebookNotes = snap.data().notes;
        selectedNotebookLastModifiedTime = snap.data().lastModifiedTime;
        allNotes = snap.data().notes;
        allNotes = allNotes.sort((noteA, noteB) => {
          return noteB.lastModifiedTime - noteA.lastModifiedTime;
        });
        // need to refactor
        dispatch({
          type: FILTER_NOTES,
          allNotes: allNotes,
          firstNote: {
            ...allNotes[0],
            notebookId: notebookId,
            notebookName: selectedNotebookName,
          },
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
    let firstNoteNotebookId;
    let firstNoteNotebookName;
    notebooksRef
      .where("owner", "==", owner)
      .get()
      .then((snap) => {
        for (let notebook of snap.docs) {
          let newNotes = notebook.data().notes;
          allNotes = allNotes.concat(newNotes);
          allNotes = allNotes.sort((noteA, noteB) => {
            return noteB.lastModifiedTime - noteA.lastModifiedTime;
          });
          if (newNotes.indexOf(allNotes[0]) !== -1) {
            console.log("found firstNote notebook");
            console.log(notebook.id);
            firstNoteNotebookId = notebook.id;
            firstNoteNotebookName = notebook.data().name;
          }
        }
        // need to refactor
        dispatch({
          type: FILTER_NOTES,
          allNotes: allNotes,
          firstNote: {
            ...allNotes[0],
            notebookId: firstNoteNotebookId,
            notebookName: firstNoteNotebookName,
          },
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
