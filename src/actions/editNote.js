import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import * as utils from "../utils";

export const editNote = (noteId, value, isEditing) => async (dispatch) => {
  const db = firebase.firestore();
  const noteRef = db.collection("notes").doc(noteId);
  const now = new Date();
  let title = utils.getNoteTitle(value);

  noteRef.get().then((doc) => {
    const data = doc.data();
    const content = data.content;
    const notebookId = data.notebookId;
    const notebookRef = db.collection("notebooks").doc(notebookId);
    if (isEditing === false) {
      // 如果前一次的Quill onChange是user click Note
      // 則檢查value是否跟database裡的資料一樣
      console.log("need to check sameContent");
      const sameContent = value === content ? true : false;
      title = data.title ? data.title : ""; // 先初始化
      if (!sameContent) {
        console.log("not same");
        noteRef.update({
          content: value,
          lastModifiedTime: now,
          title: title,
        });
        notebookRef.update({
          lastModifiedTime: now,
        });
      } else {
        console.log("same");
      }
    } else {
      noteRef.update({
        content: value,
        lastModifiedTime: now,
        title: title,
      });
      notebookRef.update({
        lastModifiedTime: now,
      });
    }
  });
};
