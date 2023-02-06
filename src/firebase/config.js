// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpCg1j4C82u-yWppZ2g_mXJEs8elvpwVg",
  authDomain: "eshop-react-ebf1b.firebaseapp.com",
  projectId: "eshop-react-ebf1b",
  storageBucket: "eshop-react-ebf1b.appspot.com",
  messagingSenderId: "863848652746",
  appId: "1:863848652746:web:c9f25479ba56ba6c4e3933",
  measurementId: "G-TC950LFFEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);