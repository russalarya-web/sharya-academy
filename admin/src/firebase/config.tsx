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
  apiKey: "AIzaSyBqAMyIVuKlBHIE6WSt3t-0WhuPcX-bHR8",
  authDomain: "sharya-academy-admin.firebaseapp.com",
  projectId: "sharya-academy-admin",
  storageBucket: "sharya-academy-admin.appspot.com",
  messagingSenderId: "1031282984904",
  appId: "1:1031282984904:web:b0f267d84e1f96bb0022fd",
  measurementId: "G-ZP8FP5LL07"
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