// Erica Moisei //
import firebase from 'firebase';
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "API Key",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();

export default db;
