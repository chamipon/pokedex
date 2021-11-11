// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcAs9JyCBujWK1lNMsMxeiVtf5jdhEreo",
  authDomain: "ultradex-a655e.firebaseapp.com",
  projectId: "ultradex-a655e",
  storageBucket: "ultradex-a655e.appspot.com",
  messagingSenderId: "225493711265",
  appId: "1:225493711265:web:f50e7e469a620e3f19b3e0",
  measurementId: "G-TCGFEWD1HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);