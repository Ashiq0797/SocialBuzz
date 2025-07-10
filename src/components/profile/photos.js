/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { useContext } from 'react';
import UserContext from '../../context/user'; // For current user
import { deletePost } from '../../services/firebase'; // For deleting from DB
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function Photos({ photos }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function handleDelete(docId, imageSrc) {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      deletePost(docId, imageSrc);
      navigate(ROUTES.DASHBOARD);
    }
  }

  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photos
          ? new Array(12).fill(0).map((_, i) => <Skeleton key={i} width={320} height={400} />)
          : photos.length > 0
          ? photos.map((photo) => (
              <div key={photo.docId} className="flex flex-col items-center relative group">
                <img src={photo.imageSrc} alt={photo.caption} className="w-full" />

                {/* Likes & Comments hover overlay */}
                <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
                  <p className="flex items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {Array.isArray(photo.likes) ? photo.likes.length : 0}
                  </p>

                  <p className="flex items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {Array.isArray(photo.comments) ? photo.comments.length : 0}
                    <button
                      onClick={() => handleDelete(photo.docId, photo.imageSrc)}
                      className="mt-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded-md shadow"
                    >
                      Delete Post
                    </button>
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>

      {!photos || (photos.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>)}
    </div>
  );
}

Photos.propTypes = {
  photos: PropTypes.array
};
