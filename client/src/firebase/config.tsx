// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut 
} from 'firebase/auth';

import { getAnalytics } from "firebase/analytics";

// Web app's Firebase configuration
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

// Initialise Authentication
const auth = getAuth(app);

// Initialise Analytics
const analytics = getAnalytics(app);

// Initialize Firestore
const db = app.firestore();

export {app, analytics, db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut}