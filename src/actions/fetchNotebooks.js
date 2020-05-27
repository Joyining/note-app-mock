import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_NOTEBOOKS } from "./types";

export const fetchNotebooks = (owner) => async (dispatch, getState) => {
  const db = firebase.firestore();
  const notebooksRef = db.collection("notebooks");
  const notesRef = db.collection("notes");

  notebooksRef
    .where("owner", "==", owner)
    .orderBy("lastModifiedTime", "desc")
    .onSnapshot((querySnapshot) => {
      let defaultNotebookId = null;
      let defaultNotebookName = null;
      let allNotebooks = [];
      for (let notebook of querySnapshot.docs) {
        if (notebook.data().defaultNotebook === true) {
          defaultNotebookId = notebook.id;
          defaultNotebookName = notebook.data().name;
          break;
        }
      }
      for (let notebook of querySnapshot.docs) {
        let aNotebook = {};
        aNotebook.notebookInfo = notebook;
        aNotebook.notes = [];
        const noteIdsInThisNotebook = notebook.data().notes;
        noteIdsInThisNotebook.map((id) => {
          notesRef
            .doc(id)
            .get()
            .then((snapshot) => {
              let data = snapshot.data();
              data.id = id;
              aNotebook.notes.push(data);
            });
        });
        allNotebooks.push(aNotebook);
      }
      dispatch({
        type: FETCH_NOTEBOOKS,
        allNotebooks: allNotebooks,
        defaultNotebook: {
          id: defaultNotebookId,
          name: defaultNotebookName,
        },
      });
    });
};
