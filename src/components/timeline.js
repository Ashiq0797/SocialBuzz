import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post';


export default function Timeline({ searchQuery }) {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(); // Fetch all photos
  const [filteredPhotos, setFilteredPhotos] = useState([]);


  useEffect(() => {
    if (!photos || photos.length === 0) {
      setFilteredPhotos([]);
      return;
    }


    const photoList = Array.isArray(photos) ? photos : [];
    const trimmedQuery = searchQuery.trim().toLowerCase();


    if (trimmedQuery.startsWith("postedby:")) {
      const usernameQuery = trimmedQuery.replace("postedby:", "").trim();
      setFilteredPhotos(
        photoList.filter((photo) => photo.username?.toLowerCase().includes(usernameQuery))
      );
    } else if (trimmedQuery) {
      setFilteredPhotos(
        photoList.filter((photo) => photo.caption?.toLowerCase().includes(trimmedQuery))
      );
    } else {
      setFilteredPhotos(photoList);
    }
  }, [searchQuery, photos]);


  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={2} width={640} height={500} className="mb-5" />
      ) : filteredPhotos.length > 0 ? (
        filteredPhotos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="flex justify-center font-bold">
          No posts match your search.
        </p>
      )}
    </div>
  );
}


Timeline.propTypes = {
  searchQuery: PropTypes.string.isRequired
};



