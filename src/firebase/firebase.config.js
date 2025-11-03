// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKWKHNdcl3KgcHcxEIqWsXeG9-RZ3ZuhA",
  authDomain: "smart-deals-8ed81.firebaseapp.com",
  projectId: "smart-deals-8ed81",
  storageBucket: "smart-deals-8ed81.firebasestorage.app",
  messagingSenderId: "367283112349",
  appId: "1:367283112349:web:8f10f7cbf2ff29aa604774"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)