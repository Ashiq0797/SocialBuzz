/* eslint-disable no-plusplus */
// NOTE: replace 'LtASBQNpG2QkhWgRXEsJqwWMUpv2' with your Firebase auth user id (can be taken from Firebase)
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export function seedDatabase(firebaseApp) {
  const users = [
    {
      userId: 'kvaIkgibDoadeWOH4qSocmCYDkW2',
      username: 'karl',
      fullName: 'Karl Hadwen',
      emailAddress: 'karlhadwen@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now(),
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['kvaIkgibDoadeWOH4qSocmCYDkW2'],
      dateCreated: Date.now(),
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['kvaIkgibDoadeWOH4qSocmCYDkW2'],
      dateCreated: Date.now(),
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['kvaIkgibDoadeWOH4qSocmCYDkW2'],
      dateCreated: Date.now(),
    },
  ];

  // Initialize Firestore
  const db = getFirestore(firebaseApp);

  // Add users to Firestore
  for (let k = 0; k < users.length; k++) {
    // Use addDoc and collection with modular API
    addDoc(collection(db, 'users'), users[k]);
  }

  // Add photos to Firestore
  for (let i = 1; i <= 5; ++i) {
    addDoc(collection(db, 'photos'), {
      photoId: i,
      userId: '2',
      imageSrc: `/images/users/raphael/${i}.jpg`,
      caption: 'Saint George and the Dragon',
      likes: [],
      comments: [
        {
          displayName: 'dali',
          comment: 'Love this place, looks like my animal farm!',
        },
        {
          displayName: 'orwell',
          comment: 'Would you mind if I used this picture?',
        },
      ],
      userLatitude: '40.7128°',
      userLongitude: '74.0060°',
      dateCreated: Date.now(),
    });
  }
}