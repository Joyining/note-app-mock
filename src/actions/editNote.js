import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import * as utils from "../utils";

export const editNote = (notebookId, noteId, value, isEditing) => async (
  dispatch
) => {
  const db = firebase.firestore();
  const notebookRef = db.collection("notebooks").doc(notebookId);
  let notes = [];
  let targetNote = null;
  let title = utils.getNoteTitle(value);
  const now = new Date();

  const updateNotebooks = () => {
    targetNote.content = value;
    targetNote.lastModifiedTime = now;
    targetNote.title = title;
    notebookRef.update({
      notes: notes,
      lastModifiedTime: now,
    });
  };

  notebookRef.get().then((snapshot) => {
    notes = snapshot.data().notes;
    for (let note of notes) {
      if (note.id === noteId) {
        targetNote = note;
      }
    }
    if (targetNote) {
      const content = targetNote.content;
      if (isEditing === false) {
        // 如果前一次的Quill onChange是user click Note
        // 則檢查value是否跟database裡的資料一樣
        const sameContent = value === content ? true : false;
        title = targetNote.title ? targetNote.title : ""; // 先初始化
        if (!sameContent) {
          updateNotebooks();
        }
      } else {
        updateNotebooks();
      }
    }
  });
};
