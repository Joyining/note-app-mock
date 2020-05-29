import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_DATA } from "./types";
import * as utils from "../utils";

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
            allNotes = allNotes.sort((noteA, noteB) => {
              return noteB.lastModifiedTime - noteA.lastModifiedTime;
            });
            // need to refactor
            dispatch({
              type: FETCH_DATA,
              allNotebooks: querySnapshot.docs,
              allNotes: allNotes,
              // 這裡的allNotes可能會有延遲，因為是.get()非同步操作後的結果
              firstNote: {
                ...allNotes[0],
                notebookId: selectedNotebook.id,
                notebookName: selectedNotebook.name,
              },
              defaultNotebook: {
                id: defaultNotebookId,
                name: defaultNotebookName,
              },
              isEditing: isEditing,
              isDeletingNote: false,
            });
          });
      } else {
        let firstNoteNotebookId;
        let firstNoteNotebookName;
        for (let notebook of querySnapshot.docs) {
          let newNotes = notebook.data().notes;
          allNotes = allNotes.concat(newNotes);
          allNotes = allNotes.sort((noteA, noteB) => {
            return noteB.lastModifiedTime - noteA.lastModifiedTime;
          });
          console.log(allNotes[0]);
          console.log(newNotes.indexOf(allNotes[0]));
          if (newNotes.indexOf(allNotes[0]) !== -1) {
            console.log("found firstNote notebook");
            console.log(notebook.id);
            firstNoteNotebookId = notebook.id;
            firstNoteNotebookName = notebook.data().name;
          }
        }

        // need to refactor
        dispatch({
          type: FETCH_DATA,
          allNotebooks: querySnapshot.docs,
          allNotes: allNotes,
          firstNote: {
            ...allNotes[0],
            notebookId: firstNoteNotebookId,
            notebookName: firstNoteNotebookName,
          },
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
