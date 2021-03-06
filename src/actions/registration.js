import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { LOG_IN, LOG_OUT, SIGN_UP } from "./types";
import { v4 as uuidv4 } from "uuid";
// import * as actions from "../actions";

export const logIn = (email, password) => async (dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      dispatch({
        type: LOG_IN,
        isLogedIn: true,
        currentUser: email,
        errorMessage: null,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch({
        type: LOG_IN,
        isLogedIn: false,
        currentUser: null,
        errorMessage: errorMessage,
        errorCode: errorCode,
      });
    });
};

export const signUp = (email, password) => async (dispatch) => {
  const id = uuidv4();
  const now = new Date();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    // .then((res) => {
    //   actions.addNotebook(uuidv4(), email, "My Notebook");
    //   // why cannot???
    // })
    .then((res) => {
      const db = firebase.firestore();
      const ref = db.collection("notebooks").doc(id);
      ref.set({
        createdTime: now,
        lastModifiedTime: now,
        name: "My Notebook",
        owner: email,
        defaultNotebook: true,
        notes: [],
      });
    })
    .then((res) => {
      dispatch({
        type: SIGN_UP,
        isLogedIn: true,
        currentUser: email,
        errorMessage: null,
        defaultNotebook: {
          id: id,
          name: "My Notebook",
        },
      });
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch({
        type: SIGN_UP,
        isLogedIn: false,
        currentUser: null,
        errorMessage: errorMessage,
        errorCode: errorCode,
        defaultNotebook: null,
      });
    });
};

export const logOut = () => async (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then((res) => {
      dispatch({
        type: LOG_OUT,
        isLogedIn: false,
        currentUser: null,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
