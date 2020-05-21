import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FILTER_NOTES } from "./types";

export const filterNotes = (owner, notebookId = "") => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes");
  var selectedRef = null;
  if (notebookId) {
    selectedRef = ref
      .where("owner", "==", owner)
      .where("notebookId", "==", notebookId)
      .orderBy("lastModifiedTime", "desc");
  } else {
    selectedRef = ref
      .where("owner", "==", owner)
      .orderBy("lastModifiedTime", "desc");
  }

  selectedRef.get().then((querySnapshot) => {
    let firstNote;
    if (querySnapshot.docs[0]) {
      const firstNoteData = querySnapshot.docs[0].data();
      firstNote = {
        id: querySnapshot.docs[0].id,
        content: firstNoteData.content ? firstNoteData.content : "",
        title: firstNoteData.title ? firstNoteData.title : "",
        notebookId: firstNoteData.notebookId ? firstNoteData.notebookId : "",
        notebookName: firstNoteData.notebookName
          ? firstNoteData.notebookName
          : "",
        lastModifiedTime: firstNoteData.lastModifiedTime
          ? firstNoteData.lastModifiedTime
          : "",
        createdTime: firstNoteData.createdTime ? firstNoteData.createdTime : "",
      };
    } else {
      firstNote = {};
    }
    dispatch({
      type: FILTER_NOTES,
      allNotes: querySnapshot.docs,
      firstNote: firstNote,
      isEditing: false,
      selectedNotebook: notebookId,
    });
  });
};
