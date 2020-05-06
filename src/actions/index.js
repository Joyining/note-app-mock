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
// export const completeNote = (completeNote) => async (dispatch) => {
//   var db = firebase.firestore();
//   var ref = db.collection("notes").doc(completeNote);

//   ref.delete().then(() => {
//     console.log("delete data successful");
//   });
// };
export const fetchNotes = () => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes");

  ref.orderBy("lastModifiedTime", "desc").onSnapshot((querySnapshot) => {
    console.log(querySnapshot);
    dispatch({
      type: FETCH_NOTES,
      payload: querySnapshot.docs,
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
      lastModifiedTime: data.lastModifiedTime ? data.lastModifiedTime : "",
    });
  });
};

export const edit = (noteId, value) => async (dispatch) => {
  var db = firebase.firestore();
  var ref = db.collection("notes").doc(noteId);
  ref.update({
    content: value,
    lastModifiedTime: new Date(),
  });
};
