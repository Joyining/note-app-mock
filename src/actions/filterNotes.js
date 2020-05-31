import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FILTER_NOTES } from "./types";
import { setAllNotes } from "./fetchData";

export const filterNotes = (owner, notebookId = "") => async (dispatch) => {
  const db = firebase.firestore();
  const notebooksRef = db.collection("notebooks");
  let selectedNotebookName = "";
  let selectedNotebookNotes = null;
  let selectedNotebookLastModifiedTime = null;
  let allNotes = [];

  const filterNotesDispatch = () => {
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
  };

  if (notebookId) {
    notebooksRef
      .doc(notebookId)
      .get()
      .then((snapshot) => {
        selectedNotebookName = snapshot.data().name;
        selectedNotebookNotes = snapshot.data().notes;
        selectedNotebookLastModifiedTime = snapshot.data().lastModifiedTime;
        const newNotes = snapshot.data().notes;
        allNotes = setAllNotes([], notebookId, snapshot.data().name, newNotes);
        filterNotesDispatch();
      });
  } else {
    notebooksRef
      .where("owner", "==", owner)
      .get()
      .then((snapshot) => {
        for (let notebook of snapshot.docs) {
          let newNotes = notebook.data().notes;
          if (newNotes.length > 0) {
            allNotes = setAllNotes(
              allNotes,
              notebook.id,
              notebook.data().name,
              newNotes
            );
          }
        }
        filterNotesDispatch();
      });
  }
};
