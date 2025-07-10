/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';

export default function Suggestions({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Local search state

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  // Ensure profiles is always an array
  const profileList = Array.isArray(profiles) ? profiles : [];

  // Search filtering logic
  const trimmedQuery = searchQuery.trim().toLowerCase();
  let filteredProfiles = profileList; // Default: all profiles

  if (trimmedQuery) {
    filteredProfiles = profileList.filter((profile) =>
      profile.username.toLowerCase().includes(trimmedQuery)
    );
  }

  return (
    <div className="rounded flex flex-col">
      {/* Search Bar for Suggestions */}
      <div className="flex justify-center my-2">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-400 shadow-sm"
        />
      </div>

      {!profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
      ) : filteredProfiles.length > 0 ? (
        <div className="mt-4 grid gap-5">
          {filteredProfiles.map((profile) => (
            <SuggestedProfile
              key={profile.docId}
              profileDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              userId={userId}
              loggedInUserDocId={loggedInUserDocId}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center">No users match your search.</p>
      )}
    </div>
  );
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string
};


