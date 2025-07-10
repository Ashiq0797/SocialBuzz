import { useState, useEffect } from 'react';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';

export default function usePhotos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const firestore = getFirestore();
    const photosRef = collection(firestore, 'photos');
    const q = query(photosRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPhotos = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          docId: doc.id, // ✅ Must be docId (not id)
          ...data,
          likes: Array.isArray(data.likes) ? data.likes : [],
          comments: Array.isArray(data.comments) ? data.comments : []
        };
      });

      fetchedPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(fetchedPhotos);
    });

    return () => unsubscribe();
  }, []);

  return { photos };
}
