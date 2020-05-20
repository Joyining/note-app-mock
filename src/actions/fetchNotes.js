import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_NOTES } from "./types";

export const fetchNotes = (owner, notebookId = "") => async (
  dispatch,
  getState
) => {
  // 若一開始用傳參數的方式將state裡的isEditing傳給fetchNotes， 他會一直是一開始的空物件
  var db = firebase.firestore();
  var ref = db.collection("notes");
  var finalRef = null;
  if (notebookId) {
    console.log("notebookId not empty");
    finalRef = ref
      .where("owner", "==", owner)
      .where("notebook", "==", notebookId)
      .orderBy("lastModifiedTime", "desc");
  } else {
    console.log("notebookId empty");
    finalRef = ref
      .where("owner", "==", owner)
      .orderBy("lastModifiedTime", "desc");
  }

  finalRef.onSnapshot((querySnapshot) => {
    // 要在onSnapshot時拿到最新的isEditing
    const state = getState();
    let firstNote;
    if (querySnapshot.docs[0]) {
      const firstNoteData = querySnapshot.docs[0].data();
      firstNote = {
        id: querySnapshot.docs[0].id,
        content: firstNoteData.content ? firstNoteData.content : "",
        title: firstNoteData.title ? firstNoteData.title : "",
        lastModifiedTime: firstNoteData.lastModifiedTime
          ? firstNoteData.lastModifiedTime
          : "",
        createdTime: firstNoteData.createdTime ? firstNoteData.createdTime : "",
      };
    } else {
      firstNote = {};
    }
    dispatch({
      type: FETCH_NOTES,
      allNotes: querySnapshot.docs,
      firstNote: firstNote,
      isEditing: typeof state.isEditing !== "boolean" ? false : true,
    });
  });
};
