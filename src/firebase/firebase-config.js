import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "just-memes-app.firebaseapp.com",
  projectId: "just-memes-app",
  storageBucket: "just-memes-app.appspot.com",
  messagingSenderId: "467364679886",
  appId: "1:467364679886:web:d3d4dfc10d39aac07c809f",
  measurementId: "G-CRMXVWZK5B"
};

const app = initializeApp(firebaseConfig);

// memesDb - Database with memes
export const memesDb = getFirestore(app)
