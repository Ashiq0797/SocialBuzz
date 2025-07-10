/**
 * Actions Component
 * 
 * This component provides interactive actions for a photo, including liking and commenting.
 * Users can toggle their like status on a photo, and the like count updates both in Firestore
 * and locally in the UI.
 *
 * Dependencies:
 * - React (useState, useContext)
 * - Firebase Firestore (getFirestore, doc, updateDoc, arrayUnion, arrayRemove)
 * - Contexts: FirebaseContext, UserContext
 *
 * Props:
 * @param {string} docId - The Firestore document ID of the photo.
 * @param {number} totalLikes - The initial count of likes for the photo.
 * @param {boolean} likedPhoto - Indicates whether the current user has liked the photo.
 * @param {function} handleFocus - Function to handle focus on the comment input field.
 */

import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'; // Import modular Firestore functions
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
  const {
    user: { uid: userId }
  } = useContext(UserContext);
  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase } = useContext(FirebaseContext);

  /**
   * Handles toggling the like state of a photo.
   * Updates Firestore with the new like/unlike status and adjusts the local state accordingly.
   */
  console.log('docId in Actions:', docId);

  const handleToggleLiked = async () => {
    const updatedToggleLiked = !toggleLiked;
    setToggleLiked(updatedToggleLiked);

    const db = getFirestore(firebase); // Initialize Firestore instance
    const docRef = doc(db, 'photos', docId); // Reference to the photo document

    await updateDoc(docRef, {
      likes: updatedToggleLiked ? arrayUnion(userId) : arrayRemove(userId), // Corrected toggle logic
    });

    setLikes((likes) => updatedToggleLiked ? likes + 1 : likes - 1); // Update like count correctly
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          {/* Like button */}
          <svg
            onClick={handleToggleLiked}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleToggleLiked();
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
            className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${
              toggleLiked ? 'fill-red text-red-primary' : 'text-black-light'
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {/* Comment button */}
          <svg
            onClick={handleFocus}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleFocus();
              }
            }}
            className="w-8 text-black-light select-none cursor-pointer focus:outline-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
      <div className="p-4 py-0">
        {/* Display like count */}
        <p className="font-bold"> {(likes || 0) === 1 ? `1 like` : `${likes || 0} likes`}</p>
      </div>
    </>
  );
}

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired
};
