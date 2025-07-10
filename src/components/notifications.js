import { useEffect, useState, useContext } from "react";
import { getNotifications } from "../services/firebase";
import LoggedInUserContext from "../context/logged-in-user";


export default function Notifications() {
  const { user } = useContext(LoggedInUserContext);
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    async function fetchNotifications() {
      if (user?.userId) {
        const notifs = await getNotifications(user.userId);
        setNotifications(notifs);
      }
    }
    fetchNotifications();
  }, [user]);


  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        notifications.map((notif) => (
          <p key={notif.docId}>
            User {notif.senderId} posted a new photo!
          </p>
        ))
      )}
    </div>
  );
}





