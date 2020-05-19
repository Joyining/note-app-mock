import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_NOTEBOOKS } from "./types";

export const fetchNotebooks = (owner) => async (dispatch, getState) => {
  var db = firebase.firestore();
  var ref = db.collection("notebooks");

  ref.where("owner", "==", owner).onSnapshot((querySnapshot) => {
    let defaultNotebookId = null;
    for (var notebook of querySnapshot.docs) {
      if (notebook.data().defaultNotebook === true) {
        defaultNotebookId = notebook.id;
        break;
      }
    }
    dispatch({
      type: FETCH_NOTEBOOKS,
      allNotebooks: querySnapshot.docs,
      defaultNotebook: defaultNotebookId,
    });
  });
};
