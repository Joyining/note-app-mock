import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const editNote = (noteId, value, isEditing) => async (dispatch) => {
  const db = firebase.firestore();
  const noteRef = db.collection("notes").doc(noteId);
  const now = new Date();
  let title = "";
  if (value) {
    let result = 0;
    const findTitleStart = (val) => {
      let startIndex = val.indexOf(">") + 1;
      result = result + startIndex;
      let subStr = val.substring(result);
      if (subStr.indexOf("<") === 0) {
        findTitleStart(subStr); // recursive
      }
      return result;
    };
    const firstIndex = findTitleStart(value);
    let temp = value.substring(firstIndex);
    title = value.substring(firstIndex, temp.indexOf("<") + firstIndex);
  }

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
