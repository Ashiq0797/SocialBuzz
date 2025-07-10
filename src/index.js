import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, db, auth, FieldValue } from './lib/firebase';
import './styles/app.css';

// Create a root for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app with the Firebase context
root.render(
  <FirebaseContext.Provider value={{ firebase, db, auth, FieldValue }}>
    <App />
  </FirebaseContext.Provider>
);