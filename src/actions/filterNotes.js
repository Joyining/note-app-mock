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

  const notebooksCollection = notebooksRef
    .where("owner", "==", owner)
    .orderBy("lastModifiedTime", "desc");

  if (notebookId) {
    notebooksCollection
      .doc(notebookId)
      .get()
      .then((snap) => {
        selectedNotebookName = snap.data().name;
        selectedNotebookNotes = snap.data().notes;
        selectedNotebookLastModifiedTime = snap.data().lastModifiedTime;
        allNotes = snap.data().notes;
        // need to refactor
        dispatch({
          type: FILTER_NOTES,
          allNotes: allNotes,
          firstNote: utils.getFirstNote(allNotes),
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
    notebooksCollection.get().then((snap) => {
      for (let notebook of snap.docs) {
        allNotes.concat(notebook.data().notes);
      }
      // need to refactor
      dispatch({
        type: FILTER_NOTES,
        allNotes: allNotes,
        firstNote: utils.getFirstNote(allNotes),
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
