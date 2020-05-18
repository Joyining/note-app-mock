import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { LOG_IN } from "./types";

export const logIn = (email, password) => async (dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      dispatch({
        type: LOG_IN,
        isLogedIn: true,
        currentUser: email,
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const signUp = (email, password) => async (dispatch) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      dispatch({
        type: LOG_IN,
        isLogedIn: true,
        currentUser: email,
      });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const logOut = () => async (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then((res) => {
      dispatch({
        type: LOG_IN,
        isLogedIn: false,
        currentUser: null,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
