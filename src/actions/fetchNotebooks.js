import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { FETCH_NOTEBOOKS } from "./types";

export const fetchNotebooks = (owner) => async (dispatch, getState) => {
  var db = firebase.firestore();
  var ref = db.collection("notebooks");

  ref.where("owner", "==", owner).onSnapshot((querySnapshot) => {
    dispatch({
      type: FETCH_NOTEBOOKS,
      allNotebooks: querySnapshot.docs,
    });
  });
};
