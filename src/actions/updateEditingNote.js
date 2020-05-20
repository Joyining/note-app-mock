import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { UPDATE_EDITING_NOTE } from "./types";

export const updateEditingNote = (noteId) => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(noteId);
  // ref.get() returns a Promise
  ref.get().then((doc) => {
    const data = doc.data();
    dispatch({
      type: UPDATE_EDITING_NOTE,
      id: noteId,
      content: data.content ? data.content : "",
      title: data.title ? data.title : "",
      notebookId: data.notebookId ? data.notebookId : "",
      notebookName: data.notebookName ? data.notebookName : "",
      lastModifiedTime: data.lastModifiedTime ? data.lastModifiedTime : "",
      createdTime: data.createdTime ? data.createdTime : "",
      isEditing: false,
    });
  });
};
