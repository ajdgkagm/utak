// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// https://firebase.google.com/docs/web/setup#available-libraries
// import firebase from 'firebase/compat/app'; // Import the compat namespace
import 'firebase/compat/auth'; // Import other Firebase services as needed
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuiZZwpUC7RnIE8jpIZN1cDyDUZlU-aW4",
  authDomain: "test-13ef3.firebaseapp.com",
  databaseURL : 'https://test-13ef3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: "test-13ef3",
  storageBucket: "test-13ef3.appspot.com",
  messagingSenderId: "1025516281131",
  appId: "1:1025516281131:web:73f5fb77d9573d5286f96e",
  measurementId: "G-2BW4VJJ9YX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app)
export const db = getDatabase(app)
export default app
