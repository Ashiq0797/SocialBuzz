import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';


export default function Post({ content = {} }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current?.focus();


  // Ensure content properties are defined with fallback defaults
  const {
    username = 'Unknown User',
    imageSrc = '',   // Default to empty string if undefined
    caption = '',    // Default to empty string if undefined
    docId = '',      // Default to empty string if undefined
    userLikedPhoto = false, // Default to false if undefined
    likes = [],      // Default to empty array if undefined
    comments = [],   // Default to empty array if undefined
    dateCreated = 0  // Default to 0 if undefined
  } = content;


  // If the username is "Unknown User", return null to prevent rendering
  if (username === 'Unknown User') {
    return null; // This skips rendering the entire Post component
  }


  console.log("here in the post index.js , imageSrc is ", imageSrc);


  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={username} />
      <Image src={imageSrc} caption={caption} />
      <Actions
        docId={docId}
        totalLikes={likes.length}  // Safely count likes
        likedPhoto={userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={caption} username={username} />
      <Comments
        docId={docId}
        comments={comments}
        posted={dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
}


Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string,
    imageSrc: PropTypes.string,
    caption: PropTypes.string,
    docId: PropTypes.string,
    userLikedPhoto: PropTypes.bool,
    likes: PropTypes.array, // Now always an array
    comments: PropTypes.array,
    dateCreated: PropTypes.number
  })
};

