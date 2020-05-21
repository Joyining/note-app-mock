import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_NOTES } from "./types";
import _ from "lodash";

export const fetchNotes = (owner, notebookId = "") => async (
  dispatch,
  getState
) => {
  // 若一開始用傳參數的方式將state裡的isEditing傳給fetchNotes， 他會一直是一開始的空物件
  var db = firebase.firestore();
  var ref = db
    .collection("notes")
    .where("owner", "==", owner)
    .orderBy("lastModifiedTime", "desc");

  ref.onSnapshot((querySnapshot) => {
    // 要在onSnapshot時拿到最新的isEditing, selectedNotebook
    const state = getState();
    const selectedNotebook = state.selectedNotebook;
    let firstNote;
    if (!_.isEmpty(selectedNotebook)) {
      console.log(selectedNotebook);
      ref
        .where("notebookId", "==", selectedNotebook)
        .get()
        .then((filteredQuerySnapshot) => {
          if (filteredQuerySnapshot.docs[0]) {
            const firstNoteData = filteredQuerySnapshot.docs[0].data();
            firstNote = {
              id: filteredQuerySnapshot.docs[0].id,
              content: firstNoteData.content ? firstNoteData.content : "",
              title: firstNoteData.title ? firstNoteData.title : "",
              notebookId: firstNoteData.notebookId
                ? firstNoteData.notebookId
                : "",
              notebookName: firstNoteData.notebookName
                ? firstNoteData.notebookName
                : "",
              lastModifiedTime: firstNoteData.lastModifiedTime
                ? firstNoteData.lastModifiedTime
                : "",
              createdTime: firstNoteData.createdTime
                ? firstNoteData.createdTime
                : "",
            };
          } else {
            firstNote = {};
          }
          dispatch({
            type: FETCH_NOTES,
            allNotes: filteredQuerySnapshot.docs,
            firstNote: firstNote,
            isEditing: typeof state.isEditing !== "boolean" ? false : true,
          });
        });
    } else {
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
          createdTime: firstNoteData.createdTime
            ? firstNoteData.createdTime
            : "",
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
    }
  });
};
