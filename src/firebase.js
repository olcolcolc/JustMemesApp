import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";

firebase.initializeApp({});

export const firestore = firebase.firestore();
export const functions = firebase.functions();

if (window.location.hostname.includes("localhost")) {
  firestore.useEmulator("localhost", 8083);
  functions.useEmulator("localhost", 3001);
}

export default firebase;