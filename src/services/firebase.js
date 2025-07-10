import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc, arrayUnion, arrayRemove, limit } from 'firebase/firestore';
import { firebase } from '../lib/firebase'; // Ensure you correctly import your initialized Firebase app
import { addDoc } from 'firebase/firestore';
import {  serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../lib/firebase';
import {  deleteDoc } from 'firebase/firestore';


export async function addPhoto(userId, photoData) {
  const firestore = getFirestore();
  const photosRef = collection(firestore, 'photos');


  // Ensure that the photo has a username and likes initialized to empty array if not provided
  const { username, caption, imageSrc } = photoData;
 
  const newPhotoRef = await addDoc(photosRef, {
    userId,
    username, // Ensure the username is added
    caption,
    imageSrc,
    likes: [], // Initialize likes as an empty array
    comments: [], // Initialize comments as an empty array
  });


  await addNotification(`${username} uploaded a photo - ${caption} !`);


  return newPhotoRef;
}


export async function doesUsernameExist(username) {
  const firestore = getFirestore(); // No need to pass firebase
  const q = query(
    collection(firestore, 'users'),
    where('username', '==', username.toLowerCase())
  );


  const querySnapshot = await getDocs(q); // Fetch query results
  return !querySnapshot.empty; // Check if querySnapshot has any documents
}


export async function getUserByUsername(username) {
  const firestore = getFirestore(firebase); // Initialize Firestore instance
  const result = await getDocs(
    query(
      collection(firestore, 'users'),
      where('username', '==', username.toLowerCase())
    )
  );


  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}


export async function getUserByUserId(userId) {
  const firestore = getFirestore(firebase); // Initialize Firestore instance
  const result = await getDocs(
    query(
      collection(firestore, 'users'),
      where('userId', '==', userId)
    )
  );


  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}


export async function getSuggestedProfiles(userId, following) {
  const firestore = getFirestore(firebase);
  let queryRef;

  const blockedUsers = [...following, userId];

  if (blockedUsers.length <= 10) {
    queryRef = query(
      collection(firestore, 'users'),
      where('userId', 'not-in', blockedUsers),
      limit(10)
    );
  } else {
    queryRef = query(
      collection(firestore, 'users'),
      limit(20)
    );
  }

  const result = await getDocs(queryRef);

  return result.docs
    .map((user) => ({
      ...user.data(),
      docId: user.id
    }))
    .filter((user) => !blockedUsers.includes(user.userId))
    .slice(0, 10);
}



export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile) {
  const firestore = getFirestore(firebase); // Initialize Firestore instance
  const userRef = doc(firestore, 'users', loggedInUserDocId);


  return setDoc(userRef, {
    following: isFollowingProfile ? arrayRemove(profileId) : arrayUnion(profileId)
  }, { merge: true });
}


export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId, isFollowingProfile) {
  const firestore = getFirestore(firebase); // Initialize Firestore instance
  const profileRef = doc(firestore, 'users', profileDocId);


  return setDoc(profileRef, {
    followers: isFollowingProfile ? arrayRemove(loggedInUserDocId) : arrayUnion(loggedInUserDocId)
  }, { merge: true });
}


// shows photos from the users being followed
/*export async function getPhotos(userId, following) {
  const firestore = getFirestore(firebase); // Initialize Firestore instance
  const result = await getDocs(
    query(
      collection(firestore, 'photos'),
      where('userId', 'in', following)
    )
  );


  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));


  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );


  return photosWithUserDetails;
}
*/
export async function getPhotos() {
  const firestore = getFirestore();
  const result = await getDocs(collection(firestore, 'photos'));


  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));


  return photos;
}


export async function getUserPhotosByUserId(userId) {
  const firestore = getFirestore(firebase); // Initialize Firestore instance
  const result = await getDocs(
    query(
      collection(firestore, 'photos'),
      where('userId', '==', userId)
    )
  );


  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));


  return photos;
}


export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const firestore = getFirestore(firebase); // Initialize Firestore instance
  const result = await getDocs(
    query(
      collection(firestore, 'users'),
      where('username', '==', loggedInUserUsername),
      where('following', 'array-contains', profileUserId)
    )
  );


  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));


  return response.userId;
}


export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}


export async function addNotification(description) {
  const firestore = getFirestore();
  const notificationsRef = collection(firestore, 'notifications');
  console.log("notificaiont log is ",description)
  return await addDoc(notificationsRef, {
    noti_id: uuidv4(),
    description,
    timestamp: serverTimestamp()
  });
}




export async function getNotifications() {
  const db = getFirestore();
  const notificationsSnapshot = await getDocs(collection(db, 'notifications'));


  return notificationsSnapshot.docs
    .map((doc) => ({
      ...doc.data(),
      docId: doc.id
    }))
    .sort((a, b) => b.timestamp?.toMillis() - a.timestamp?.toMillis());
}


export async function deletePost(docId, imageSrc) {
  try {
    // 1. Delete the document from Firestore
    await deleteDoc(doc(db, 'photos', docId));


  } catch (error) {
    console.error('Error deleting post:', error);
  }
}



