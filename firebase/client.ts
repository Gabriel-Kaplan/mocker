// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHcLbWGvh9KKJGI3IsW0jWZZU0uoQt7FU",
  authDomain: "mocker-86b94.firebaseapp.com",
  projectId: "mocker-86b94",
  storageBucket: "mocker-86b94.firebasestorage.app",
  messagingSenderId: "727892204657",
  appId: "1:727892204657:web:97d060c1dc50f9ce388fd0",
  measurementId: "G-8198J4QW89"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);