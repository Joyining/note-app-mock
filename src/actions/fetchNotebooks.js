import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_NOTEBOOKS } from "./types";

export const fetchNotebooks = () => async (dispatch, getState) => {
  var db = firebase.firestore();
  var ref = db.collection("notebooks");

  ref.onSnapshot((querySnapshot) => {
    dispatch({
      type: FETCH_NOTEBOOKS,
      allNotebooks: querySnapshot.docs,
    });
  });
};
