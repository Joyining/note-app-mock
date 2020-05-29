import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_DATA } from "./types";

export const fetchData = (owner) => async (dispatch, getState) => {
  const db = firebase.firestore();
  const notebooksRef = db.collection("notebooks");

  notebooksRef
    .where("owner", "==", owner)
    .orderBy("lastModifiedTime", "desc")
    .onSnapshot((querySnapshot) => {
      let defaultNotebookId = null;
      let defaultNotebookName = null;
      let allNotes = [];
      const state = getState();
      const selectedNotebook = state.selectedNotebook;
      const isDeletingNote = state.isDeletingNote;
      const isEditingInState = state.isEditing;
      const isEditing =
        typeof isEditingInState !== "boolean" || isDeletingNote ? false : true;
      for (let notebook of querySnapshot.docs) {
        if (notebook.data().defaultNotebook === true) {
          defaultNotebookId = notebook.id;
          defaultNotebookName = notebook.data().name;
          break;
        }
      }
      if (selectedNotebook && selectedNotebook.id) {
        notebooksRef
          .doc(selectedNotebook.id)
          .get()
          .then((snapshot) => {
            allNotes = snapshot.data().notes;
            if (allNotes) {
              allNotes = allNotes.map((note) => {
                const newNote = {
                  ...note,
                  notebookId: selectedNotebook.id,
                  notebookName: selectedNotebook.name,
                };
                return newNote;
              });
              allNotes = allNotes.sort((noteA, noteB) => {
                return noteB.lastModifiedTime - noteA.lastModifiedTime;
              });
            }

            // need to refactor
            dispatch({
              type: FETCH_DATA,
              allNotebooks: querySnapshot.docs,
              allNotes: allNotes,
              // 這裡的allNotes可能會有延遲，因為是.get()非同步操作後的結果
              firstNote: allNotes[0] ? allNotes[0] : {},
              defaultNotebook: {
                id: defaultNotebookId,
                name: defaultNotebookName,
              },
              isEditing: isEditing,
              isDeletingNote: false,
            });
          });
      } else {
        for (let notebook of querySnapshot.docs) {
          let newNotes = notebook.data().notes;
          newNotes.map((note) => {
            note.notebookId = notebook.id;
            note.notebookName = notebook.data().name;
          });
          allNotes = allNotes.concat(newNotes);
          allNotes = allNotes.sort((noteA, noteB) => {
            return noteB.lastModifiedTime - noteA.lastModifiedTime;
          });
        }

        // need to refactor
        dispatch({
          type: FETCH_DATA,
          allNotebooks: querySnapshot.docs,
          allNotes: allNotes,
          firstNote: allNotes[0] ? allNotes[0] : {},
          // firstNote: utils.getFirstNote(allNotes),
          defaultNotebook: {
            id: defaultNotebookId,
            name: defaultNotebookName,
          },
          isEditing: isEditing,
          isDeletingNote: false,
        });
      }
    });
};
