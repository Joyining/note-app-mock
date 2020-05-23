import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const addNotebook = (id, owner, name = "") => async (dispatch) => {
  const db = firebase.firestore();
  const defaultNotebook = false;
  const now = new Date();
  db.collection("notebooks")
    .get()
    .then((snap) => {
      if (snap.size === 0) {
        defaultNotebook = true;
        // 因為第一本notebook在signUp時已建立
        // 所以這邊可以不需判斷snap.size了
      }
    })
    .then((res) => {
      const ref = db.collection("notebooks").doc(id);
      ref.set({
        createdTime: now,
        lastModifiedTime: now, // or null?
        name: name,
        owner: owner,
        defaultNotebook: defaultNotebook,
        notes: [],
      });
    });
};
