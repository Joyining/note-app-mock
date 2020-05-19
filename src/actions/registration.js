import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { REGISTER } from "./types";
import { v4 as uuidv4 } from "uuid";
// import * as actions from "../actions";

export const logIn = (email, password) => async (dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      dispatch({
        type: REGISTER,
        isLogedIn: true,
        currentUser: email,
        errorMessage: null,
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      dispatch({
        type: REGISTER,
        isLogedIn: false,
        currentUser: null,
        errorMessage: errorMessage,
      });
    });
};

export const signUp = (email, password) => async (dispatch) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      dispatch({
        type: REGISTER,
        isLogedIn: true,
        currentUser: email,
        errorMessage: null,
      });
    })
    // .then((res) => {
    //   actions.addNotebook(uuidv4(), email, "My Notebook");
    //   // why cannot???
    // })
    .then((res) => {
      var db = firebase.firestore();
      var ref = db.collection("notebooks").doc(uuidv4());
      ref.set({
        createdTime: new Date(),
        name: "My Notebook",
        owner: email,
        defaultNotebook: true,
      });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      dispatch({
        type: REGISTER,
        isLogedIn: false,
        currentUser: null,
        errorMessage: errorMessage,
      });
    });
};

export const logOut = () => async (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then((res) => {
      dispatch({
        type: REGISTER,
        isLogedIn: false,
        currentUser: null,
        errorMessage: null,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
