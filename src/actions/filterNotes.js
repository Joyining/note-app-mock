import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FILTER_NOTES } from "./types";
import * as utils from "../utils";

export const filterNotes = (owner, notebookId = "") => async (dispatch) => {
  const db = firebase.firestore();
  const notesCollection = db.collection("notes");
  const notebooksCollection = db.collection("notebooks");
  let selectedNotesCollection = null;
  let selectedNotebookName = "";
  let selectedNotebookNotes = null;
  let selectedNotebookLastModifiedTime = null;
  if (notebookId) {
    selectedNotesCollection = notesCollection
      .where("owner", "==", owner)
      .where("notebookId", "==", notebookId)
      .orderBy("lastModifiedTime", "desc");
    notebooksCollection.get().then((snap) => {
      for (let notebook of snap.docs) {
        if (notebook.id === notebookId) {
          selectedNotebookName = notebook.data().name;
          selectedNotebookNotes = notebook.data().notes;
          selectedNotebookLastModifiedTime = notebook.data().lastModifiedTime;
          break;
        }
      }
    });
  } else {
    selectedNotesCollection = notesCollection
      .where("owner", "==", owner)
      .orderBy("lastModifiedTime", "desc");
  }

  selectedNotesCollection.get().then((querySnapshot) => {
    dispatch({
      type: FILTER_NOTES,
      allNotes: querySnapshot.docs,
      firstNote: utils.getFirstNote(querySnapshot),
      isEditing: false,
      selectedNotebook: {
        id: notebookId,
        name: selectedNotebookName,
        notes: selectedNotebookNotes,
        lastModifiedTime: selectedNotebookLastModifiedTime,
      },
    });
  });
};
