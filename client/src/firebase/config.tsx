// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeM-RyhAtyS1cibBy71FvYZmbpIFYcPns",
  authDomain: "sharya-academy.firebaseapp.com",
  projectId: "sharya-academy",
  storageBucket: "sharya-academy.appspot.com",
  messagingSenderId: "998684537717",
  appId: "1:998684537717:web:c47dd19923dcafbf27993c",
  measurementId: "G-ZK2068XSK7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize db
const db = app.firestore();

export {app, analytics, db}