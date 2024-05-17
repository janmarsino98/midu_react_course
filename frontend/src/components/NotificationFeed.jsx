import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./CurrentUserContext";
import { GiConsoleController } from "react-icons/gi";
import axios from "../../back_address";
import Notification from "./Notification";

const NotificationFeed = () => {
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [notificationsToDisplay, setNotificationsToDisplay] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/${currentUser.username}/get_unread_notifications`
        );
        setUnreadNotifications(response.data);
        if (notificationsToDisplay) {
          setNotificationsToDisplay(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>The current user is loading...</div>;
  }

  if (!unreadNotifications) {
    return <div>There are no unread notifications for the current user...</div>;
  }

  return (
    <div className="text-white">
      {notificationsToDisplay.map((notification, index) => {
        {
          return (
            <Notification
              key={index}
              type={notification.type}
              users={notification.users}
              tweet={notification.tweet}
            ></Notification>
          );
        }
      })}
    </div>
  );
};

export default NotificationFeed;
