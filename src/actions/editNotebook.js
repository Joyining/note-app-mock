import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const setAsDefaultNotebook = (notebookId, owner) => async (dispatch) => {
  var db = firebase.firestore();
  var collection = db.collection("notebooks");
  collection
    .where("owner", "==", owner)
    .get()
    .then((snap) => {
      for (var notebook of snap.docs) {
        collection.doc(notebook.id).update({
          defaultNotebook: false,
        });
      }
    })
    .then((res) => {
      collection.doc(notebookId).update({
        defaultNotebook: true,
      });
    });
};
