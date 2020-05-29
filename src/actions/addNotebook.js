import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const addNotebook = (id, owner, name = "") => async (dispatch) => {
  const db = firebase.firestore();
  const ref = db.collection("notebooks").doc(id);
  const now = new Date();
  ref.set({
    createdTime: now,
    lastModifiedTime: now, // or null?
    name: name,
    owner: owner,
    defaultNotebook: false,
    notes: [],
  });
};
