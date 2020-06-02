import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { DELETE_NOTEBOOK } from "./types";

export const deleteNotebook = (notebookId) => async (dispatch) => {
  const db = firebase.firestore();
  const notebookRef = db.collection("notebooks").doc(notebookId);
  notebookRef.delete().then((res) => {
    dispatch({
      type: DELETE_NOTEBOOK,
      view: "notebookList",
      selectedNotebook: {
        id: "",
        name: "",
        notes: null,
        lastModifiedTime: null,
      },
    });
  });
};
