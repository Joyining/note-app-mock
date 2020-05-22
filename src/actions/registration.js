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
      var errorCode = error.code;
      var errorMessage = error.message;
      dispatch({
        type: LOG_IN,
        isLogedIn: false,
        currentUser: null,
        errorMessage: errorMessage,
      });
    });
};

export const signUp = (email, password) => async (dispatch) => {
  const id = uuidv4();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    // .then((res) => {
    //   actions.addNotebook(uuidv4(), email, "My Notebook");
    //   // why cannot???
    // })
    .then((res) => {
      var db = firebase.firestore();
      var ref = db.collection("notebooks").doc(id);
      ref.set({
        createdTime: new Date(),
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
      var errorCode = error.code;
      var errorMessage = error.message;
      dispatch({
        type: SIGN_UP,
        isLogedIn: false,
        currentUser: null,
        errorMessage: errorMessage,
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
