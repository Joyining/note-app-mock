import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const addNotebook = (id, name = "") => async (dispatch) => {
  var db = firebase.firestore();
  var defaultNotebook = false;
  db.collection("notebooks")
    .get()
    .then((snap) => {
      if (snap.size === 0) {
        defaultNotebook = true;
      }
    })
    .then((res) => {
      var ref = db.collection("notebooks").doc(id);
      ref.set({
        createdTime: new Date(),
        name: name,
        defaultNotebook: defaultNotebook,
      });
    });
};
