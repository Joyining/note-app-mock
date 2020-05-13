import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const addNotebook = (id, name = "") => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notebooks").doc(id);
  ref.set({
    createdTime: new Date(),
    // lastModifiedTime: new Date(),
    name: name,
  });
};
