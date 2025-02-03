// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-6m_BRaVx0r3HPi7ZZhJPGNAumRq_W4k",
  authDomain: "nutriauth-178da.firebaseapp.com",
  projectId: "nutriauth-178da",
  storageBucket: "nutriauth-178da.firebasestorage.app",
  messagingSenderId: "3538154584",
  appId: "1:3538154584:web:3dbbf1dce22353d233862d",
  measurementId: "G-DG0XXQKFNJ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// Initialize Firebase
const analytics = getAnalytics(app);
export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };