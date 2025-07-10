import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';


export default function Dashboard({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser.uid);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query


  useEffect(() => {
    document.title = 'Instagram';
  }, []);


  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="bg-gray-background">
        <Header />
       
        {/* Search Bar */}
        <div className="flex justify-center my-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-400 shadow-sm"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
           
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-8"> {/* Added mt-8 for spacing */}
          <Timeline searchQuery={searchQuery} />
          <Sidebar />
        </div>




        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-8">
          {/* Pass the search query to Timeline */}
          <Timeline searchQuery={searchQuery} />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}


Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};




