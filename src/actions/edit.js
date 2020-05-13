import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const edit = (noteId, value, isEditing) => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(noteId);
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
  if (isEditing === false) {
    // 如果前一次的Quill onChange是user click ListItem
    // 則檢查value是否跟database裡的資料一樣
    console.log("need to check sameContent");
    ref.get().then((doc) => {
      const content = doc.data().content;
      var sameContent = value === content ? true : false;
      title = doc.data().title ? doc.data().title : ""; // 先初始化

      if (!sameContent) {
        console.log("not same");
        ref.update({
          content: value,
          lastModifiedTime: new Date(),
          title: title,
        });
      } else {
        console.log("same");
      }
    });
  } else {
    ref.update({
      content: value,
      lastModifiedTime: new Date(),
      title: title,
    });
  }
};
