import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUnRUWJnkAGWKyXZqMpsh20PrnixvGg5o",
  authDomain: "pintabien-f205f.firebaseapp.com",
  projectId: "pintabien-f205f",
  storageBucket: "pintabien-f205f.appspot.com",
  messagingSenderId: "542992009078",
  appId: "1:542992009078:web:087a3d7c47611ac8bf9c57",
  measurementId: "G-RKSPCVCFLL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
