import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUserId, addPhoto } from '../../services/firebase';




export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0,
    newPhoto: null,
    caption: ""
  };




  const [state, dispatch] = useReducer(reducer, initialState);
  const { profile, photosCollection, followerCount, newPhoto, caption } = state;




  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
    }
    getProfileInfoAndPhotos();
  }, [user.username]);




  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const filePath = `/images/users/${user.username}/${file.name}`;
      dispatch({ ...state, newPhoto: filePath });
    }
  };




  const handleAddPhoto = async () => {
    if (newPhoto && caption) {
      console.log("Adding photo with:", user.userId, newPhoto, caption, user.username);
 
      const success = await addPhoto(user.userId, {
        imageSrc: newPhoto,
        caption,
        username: user.username,
      });
 
      if (success) {
        console.log("Photo added successfully!");
        dispatch({ ...state, newPhoto: null, caption: "" });
      } else {
        console.error("Failed to add photo.");
      }
    } else {
      console.error("Missing photo or caption.");
    }
  };
  ;
 




  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <div>
        <input type="file" onChange={handlePhotoUpload} />
        <input
          type="text"
          placeholder="Enter caption"
          value={caption}
          onChange={(e) => dispatch({ ...state, caption: e.target.value })}
        />
        <button onClick={handleAddPhoto}>Add Post</button>
      </div>
      <Photos photos={photosCollection} />
    </>
  );
}




Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  })
};



