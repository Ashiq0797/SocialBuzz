// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, FieldValue } from 'firebase/firestore'; // Import FieldValue from firestore
import { getAuth } from 'firebase/auth';
import { seedDatabase } from '../seed';

const config = {
  apiKey: "AIzaSyB5cH5EUhyR2AyxeBlz2JM9t8WsmNsU7Bw",
  authDomain: "instagram-clone-44600.firebaseapp.com",
  projectId: "instagram-clone-44600",
  storageBucket: "instagram-clone-44600.appspot.com",
  messagingSenderId: "1059700014682",
  appId: "1:1059700014682:web:dd9a978e98dcff3310e263"
};

// Initialize Firebase
const firebaseApp = initializeApp(config);

// Initialize Firestore and Auth
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Call seedDatabase once
//seedDatabase(firebaseApp);

export { firebaseApp as firebase, db, auth, FieldValue };


