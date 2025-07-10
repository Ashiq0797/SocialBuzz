import { useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Import modular functions
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth(firebase);  // Initialize auth from the firebase instance

    const listener = onAuthStateChanged(auth, (authUser) => {  // Use onAuthStateChanged from auth module
      if (authUser) {
        // we have a user... therefore, store the user in localStorage
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // no authUser, therefore clear localStorage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    // Cleanup listener on unmount
    return () => listener();
  }, [firebase]);

  return { user };
}