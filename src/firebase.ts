// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6k6FSDmIJ0Iq6dDX6G0IC0dBJCLn2Su0",
  authDomain: "cine-ticket-app.firebaseapp.com",
  projectId: "cine-ticket-app",
  storageBucket: "cine-ticket-app.appspot.com",
  messagingSenderId: "262276931398",
  appId: "1:262276931398:web:deb88f6038d53536600f47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
 