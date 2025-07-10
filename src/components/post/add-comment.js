import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const { firebase } = useContext(FirebaseContext);
  const {
    user: { displayName }
  } = useContext(UserContext);

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    if (comment.length < 1) return;

    const db = getFirestore(firebase);
    const docRef = doc(db, 'photos', docId);

    // Push new comment to Firestore
    await updateDoc(docRef, {
      comments: arrayUnion({ displayName, comment })
    });

    // Update local UI
    setComments([...comments, { displayName, comment }]);
    setComment('');
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) => (comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault())}
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
          type="button"
          onClick={handleSubmitComment}
          disabled={comment.length < 1}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired
};
