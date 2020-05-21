import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FILTER_NOTES } from "./types";

export const filterNotes = (owner, notebookId = "") => async (dispatch) => {
  const db = firebase.firestore();
  const notesCollection = db.collection("notes");
  const notebooksCollection = db.collection("notebooks");
  let selectedNotesCollection = null;
  let selectedNotebookName = "";
  if (notebookId) {
    selectedNotesCollection = notesCollection
      .where("owner", "==", owner)
      .where("notebookId", "==", notebookId)
      .orderBy("lastModifiedTime", "desc");
    notebooksCollection.get().then((snap) => {
      for (let notebook of snap.docs) {
        if (notebook.id === notebookId) {
          selectedNotebookName = notebook.data().name;
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
    let firstNote;
    if (querySnapshot.docs[0]) {
      const firstNoteData = querySnapshot.docs[0].data();
      firstNote = {
        id: querySnapshot.docs[0].id,
        content: firstNoteData.content ? firstNoteData.content : "",
        title: firstNoteData.title ? firstNoteData.title : "",
        notebookId: firstNoteData.notebookId ? firstNoteData.notebookId : "",
        notebookName: firstNoteData.notebookName
          ? firstNoteData.notebookName
          : "",
        lastModifiedTime: firstNoteData.lastModifiedTime
          ? firstNoteData.lastModifiedTime
          : "",
        createdTime: firstNoteData.createdTime ? firstNoteData.createdTime : "",
      };
    } else {
      firstNote = {};
    }
    dispatch({
      type: FILTER_NOTES,
      allNotes: querySnapshot.docs,
      firstNote: firstNote,
      isEditing: false,
      selectedNotebook: {
        id: notebookId,
        name: selectedNotebookName,
      },
    });
  });
};
