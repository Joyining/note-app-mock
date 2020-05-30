import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { SET_AS_DEFAULT_NOTEBOOK } from "./types";

export const setAsDefaultNotebook = (notebookId, owner) => async (dispatch) => {
  const db = firebase.firestore();
  const collection = db.collection("notebooks");
  collection
    .where("owner", "==", owner)
    .get()
    .then((snapshot) => {
      for (let notebook of snapshot.docs) {
        collection.doc(notebook.id).update({
          defaultNotebook: false,
        });
      }
      collection.doc(notebookId).update({
        defaultNotebook: true,
      });
    });
  collection
    .doc(notebookId)
    .get()
    .then((thisNotebook) => {
      dispatch({
        type: SET_AS_DEFAULT_NOTEBOOK,
        defaultNotebook: {
          id: notebookId,
          name: thisNotebook.data().name,
        },
      });
    });
};
