import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const addNotebook = (id, owner, name = "") => async (dispatch) => {
  console.log("add Notebook");
  var db = firebase.firestore();
  var defaultNotebook = false;
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
      var ref = db.collection("notebooks").doc(id);
      ref.set({
        createdTime: new Date(),
        name: name,
        owner: owner,
        defaultNotebook: defaultNotebook,
      });
    });
};
