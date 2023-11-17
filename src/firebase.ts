// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrw_o_hGjUb88kzEDnxqwg5uswIh108Mo",
  authDomain: "movies-a1444.firebaseapp.com",
  projectId: "movies-a1444",
  storageBucket: "movies-a1444.appspot.com",
  messagingSenderId: "932418370256",
  appId: "1:932418370256:web:eb773714fd8a14b1543cd5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)