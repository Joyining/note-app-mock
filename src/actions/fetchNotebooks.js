import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_NOTEBOOKS } from "./types";

export const fetchNotebooks = (owner) => async (dispatch, getState) => {
  const db = firebase.firestore();
  const ref = db.collection("notebooks");

  ref
    .where("owner", "==", owner)
    .orderBy("lastModifiedTime", "desc")
    .onSnapshot((querySnapshot) => {
      let defaultNotebookId = null;
      let defaultNotebookName = null;
      for (let notebook of querySnapshot.docs) {
        if (notebook.data().defaultNotebook === true) {
          defaultNotebookId = notebook.id;
          defaultNotebookName = notebook.data().name;
          break;
        }
      }
      dispatch({
        type: FETCH_NOTEBOOKS,
        allNotebooks: querySnapshot.docs,
        defaultNotebook: {
          id: defaultNotebookId,
          name: defaultNotebookName,
        },
      });
    });
};
