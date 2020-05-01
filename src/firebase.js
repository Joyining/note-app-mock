import * as firebase from "firebase";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDwm_AaADaS3be9Ph4U0B-1dvqLEZVqHqw",
  authDomain: "note-app-mock.firebaseapp.com",
  databaseURL: "https://note-app-mock.firebaseio.com",
  projectId: "note-app-mock",
  storageBucket: "note-app-mock.appspot.com",
  messagingSenderId: "1074255342036",
  appId: "1:1074255342036:web:021d1b30f5bc61a4878e41",
  measurementId: "G-8LYDGD69DT",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// In contrast to Redux, the Firebase database has something called the Firebase Ref. This is a reference to the data that we want to access from the Firebase database.

// The Firebase Ref emits a series of value events, which are Firebase’s way of telling us that it has received some new data from the application.

// Ok! So we have connected our React app with the Firebase Project! We are going to use the Firebase’s database to store the list of notes. We will add a listener to the list of notes so that whenever the list changes, the app will know about the change and fetch the new data from Firebase and display it.

const databaseRef = firebase.database().ref();
export const notesRef = databaseRef.child("notes");
