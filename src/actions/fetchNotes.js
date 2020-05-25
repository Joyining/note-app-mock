import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_NOTES } from "./types";
import _ from "lodash";
import * as utils from "../utils";

export const fetchNotes = (owner) => async (dispatch, getState) => {
  // 若一開始用傳參數的方式將state裡的isEditing傳給fetchNotes， 他會一直是一開始的空物件
  const db = firebase.firestore();
  const ref = db
    .collection("notes")
    .where("owner", "==", owner)
    .orderBy("lastModifiedTime", "desc");

  ref.onSnapshot((querySnapshot) => {
    // 要在onSnapshot時拿到最新的isEditing, selectedNotebook
    const state = getState();
    const selectedNotebook = state.selectedNotebook;
    const isDeletingNote = state.isDeletingNote;
    const isEditingInState = state.isEditing;
    const isEditing =
      typeof isEditingInState !== "boolean" || isDeletingNote ? false : true;
    if (selectedNotebook && selectedNotebook.id) {
      ref
        .where("notebookId", "==", selectedNotebook.id)
        .get()
        .then((filteredQuerySnapshot) => {
          dispatch({
            type: FETCH_NOTES,
            allNotes: filteredQuerySnapshot.docs,
            firstNote: utils.getFirstNote(filteredQuerySnapshot),
            isEditing: isEditing,
            isDeletingNote: false,
          });
        });
    } else {
      dispatch({
        type: FETCH_NOTES,
        allNotes: querySnapshot.docs,
        firstNote: utils.getFirstNote(querySnapshot),
        isEditing: isEditing,
        isDeletingNote: false,
      });
    }
  });
};
