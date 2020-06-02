import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_DATA } from "./types";

export const setAllNotes = (
  presAllNotes,
  notebookId,
  notebookName,
  newNotes
) => {
  newNotes = newNotes.map((note) => {
    const newNote = {
      ...note,
      notebookId: notebookId,
      notebookName: notebookName,
    };
    return newNote;
  });
  presAllNotes = presAllNotes.concat(newNotes);
  return presAllNotes.sort((noteA, noteB) => {
    return noteB.lastModifiedTime - noteA.lastModifiedTime;
  });
};

export const fetchData = (owner) => async (dispatch, getState) => {
  const db = firebase.firestore();
  const notebooksRef = db.collection("notebooks");

  const getDefaultNotebook = (querySnapshot) => {
    let defaultNotebook = {};
    for (let notebook of querySnapshot.docs) {
      if (notebook.data().defaultNotebook === true) {
        defaultNotebook.id = notebook.id;
        defaultNotebook.name = notebook.data().name;
        break;
      }
    }
    return defaultNotebook;
  };

  const setAllNotesFromAllNotebooks = (querySnapshot, allNotes) => {
    for (let notebook of querySnapshot.docs) {
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
    return allNotes;
  };

  const fetchDataDispatch = (querySnapshot, allNotes, isEditing) => {
    dispatch({
      type: FETCH_DATA,
      allNotebooks: querySnapshot.docs,
      allNotes: allNotes,
      firstNote: allNotes[0] ? allNotes[0] : {},
      defaultNotebook: {
        id: getDefaultNotebook(querySnapshot).id,
        name: getDefaultNotebook(querySnapshot).name,
      },
      isEditing: isEditing,
      isDeletingNote: false,
    });
  };

  notebooksRef
    .where("owner", "==", owner)
    .orderBy("lastModifiedTime", "desc")
    .onSnapshot((querySnapshot) => {
      let allNotes = [];
      const state = getState();
      const selectedNotebook = state.selectedNotebook;
      const isDeletingNote = state.isDeletingNote;
      const isEditingInState = state.isEditing;
      const isEditing =
        typeof isEditingInState !== "boolean" || isDeletingNote ? false : true;
      if (selectedNotebook && selectedNotebook.id) {
        notebooksRef
          .doc(selectedNotebook.id)
          .get()
          .then((snapshot) => {
            if (snapshot.data()) {
              const newNotes = snapshot.data().notes;
              allNotes = setAllNotes(
                [],
                selectedNotebook.id,
                selectedNotebook.name,
                newNotes
              );
              fetchDataDispatch(querySnapshot, allNotes, isEditing);
            } else {
              allNotes = setAllNotesFromAllNotebooks(querySnapshot, allNotes);
              fetchDataDispatch(querySnapshot, allNotes, isEditing);
            }
          });
      } else {
        allNotes = setAllNotesFromAllNotebooks(querySnapshot, allNotes);
        fetchDataDispatch(querySnapshot, allNotes, isEditing);
      }
    });
};
