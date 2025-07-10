import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import { DEFAULT_IMAGE_PATH } from '../constants/paths';
import useUser from '../hooks/use-user';
import { getAuth } from 'firebase/auth';
import { getNotifications } from '../services/firebase'; // You should already have this


export default function Header() {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    const fetchNotifications = async () => {
      //if (user?.uid) {
        const notifs = await getNotifications(user.uid);
        console.log("all notifcaions form header--")
        setNotifications(notifs);
      //}
    };
    console.log("modal ipen value is ",modalOpen)
    if (modalOpen) {
      fetchNotifications();
    }
  }, [modalOpen, user?.uid]);


  return (
    <>
      <header className="h-16 bg-white border-b border-gray-primary mb-8">
        <div className="container mx-auto max-w-screen-lg h-full">
          <div className="flex justify-between h-full">
            <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
              <h1 className="flex justify-center w-full">
                <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                <img src="/images/logo.png" alt="socialbuzz" className="w-16 h-auto mt-3" />
                </Link>
              </h1>
            </div>
            <div className="text-gray-700 text-center flex items-center align-items">
              {loggedInUser ? (
                <>
                  <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                    <svg className="w-8 mr-6 text-black-light cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </Link>


                  <button className="relative" onClick={() => setModalOpen(true)}>
                    <svg className="w-8 mr-6 text-black-light cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.403-1.403A7.978 7.978 0 0016 10V8a6 6 0 10-12 0v2a7.978 7.978 0 00-2.597 5.597L1 17h5m5 4a3 3 0 006 0" />
                    </svg>
                  </button>


                  <button
                    type="button"
                    title="Sign Out"
                    onClick={() => {
                      getAuth().signOut();
                      navigate(ROUTES.LOGIN);
                    }}
                  >
                    <svg className="w-8 mr-6 text-black-light cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>


                  {user && (
                    <div className="flex items-center cursor-pointer">
                      <Link to={`/p/${user?.username}`}>
                        <img
                          className="rounded-full h-8 w-8 flex"
                          src={`/images/avatars/${user?.username}.jpg`}
                          alt={`${user?.username} profile`}
                          onError={(e) => {
                            e.target.src = DEFAULT_IMAGE_PATH;
                          }}
                        />
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link to={ROUTES.LOGIN}>
                    <button className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8">
                      Log In
                    </button>
                  </Link>
                  <Link to={ROUTES.SIGN_UP}>
                    <button className="font-bold text-sm rounded text-blue-medium w-20 h-8">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>


      {modalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-20 bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg w-96 p-4 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Notifications</h2>
              <button onClick={() => setModalOpen(false)} className="text-red-500 font-bold">X</button>
            </div>
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500">No notifications found.</p>
            ) : (
              <ul className="space-y-2">
                {notifications.map((notif) => (
                  <li key={notif.noti_id} className="text-sm border-b pb-1">
                    {notif.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
     
    </>
  );
}





