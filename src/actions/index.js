import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_NOTES, UPDATE_EDITING_NOTE } from "./types";

export const addNote = (noteId, newNote) => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(noteId);
  ref.set(newNote);
  console.log("add note !!!!");
};
export const deleteNote = (noteId) => async (dispatch) => {
  console.log("delete note action");
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(noteId);

  ref.delete().then(() => {
    console.log("delete data successful");
  });
};
export const fetchNotes = () => async (dispatch, getState) => {
  // 若一開始用傳參數的方式將state裡的isEditing傳給fetchNotes， 他會一直是一開始的空物件
  var db = firebase.firestore();
  var ref = db.collection("notes");

  ref.orderBy("lastModifiedTime", "desc").onSnapshot((querySnapshot) => {
    // 要在onSnapshot時拿到最新的isEditing
    const state = getState();
    console.log(state);
    const firstNoteData = querySnapshot.docs[0].data();
    dispatch({
      type: FETCH_NOTES,
      allNotes: querySnapshot.docs,
      firstNote: {
        noteId: querySnapshot.docs[0].id,
        noteContent: firstNoteData.content ? firstNoteData.content : "",
        noteTitle: firstNoteData.title ? firstNoteData.title : "",
        lastModifiedTime: firstNoteData.lastModifiedTime
          ? firstNoteData.lastModifiedTime
          : "",
      },
      isEditing: typeof state.isEditing !== "boolean" ? false : true,
    });
  });
};

export const updateEditingNote = (noteId) => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(noteId);
  // ref.get() returns a Promise
  ref.get().then((doc) => {
    const data = doc.data();
    dispatch({
      type: UPDATE_EDITING_NOTE,
      noteId: noteId,
      noteContent: data.content ? data.content : "",
      noteTitle: data.title ? data.title : "",
      lastModifiedTime: data.lastModifiedTime ? data.lastModifiedTime : "",
      isEditing: false,
    });
  });
};

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
      title = doc.data().title; // 先初始化

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
