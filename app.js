// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYHy7Tc1v6K1EVSk0QkYA9of4L8SGGFiw",
  authDomain: "grocerystore-69026.firebaseapp.com",
  projectId: "grocerystore-69026",
  storageBucket: "grocerystore-69026.firebasestorage.app",
  messagingSenderId: "618172755403",
  appId: "1:618172755403:web:83e95d4ee3f07a6f961a4e",
  measurementId: "G-HSCY30YL2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
