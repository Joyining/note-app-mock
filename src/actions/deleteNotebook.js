import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const deleteNotebook = (notebookId) => async () => {
  const db = firebase.firestore();
  const notebookRef = db.collection("notebooks").doc(notebookId);
  notebookRef.delete().then(() => {
    console.log("delete notebook success");
  });
};
