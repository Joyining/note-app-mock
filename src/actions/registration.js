import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { REGISTER } from "./types";

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
