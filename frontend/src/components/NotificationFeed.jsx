import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./CurrentUserContext";
import { GiConsoleController } from "react-icons/gi";
import BACK_ADRESS from "../../back_address";

const NotificationFeed = () => {
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchNewNotifications = async () => {
      try {
        const response = await fetch(
          `${BACK_ADRESS}/${currentUser.username}/get_notifications`
        );
        const data = await response.json();
        setUnreadNotifications(data);
      } catch (error) {
        console.error("Error while fetching users' notifications: ", error);
      }
    };
    fetchNewNotifications();
  }, []);

  if (!currentUser) {
    return <div>The current user is loading...</div>;
  }

  if (!currentUser.unread_notifications) {
    return <div>There are no unread notifications for the current user...</div>;
  }

  return (
    <div className="text-white">
      {unreadNotifications.map((notification, index) => {
        {
          let message;
          if (notification.users.length >= 4) {
            message = `${notification.users.slice(0, 2).join(", ")} and ${
              notification.users.length - 2
            } more users liked your tweet!`;
          } else if (notification.users.length == 3) {
            message = `${notification.users.slice(0, 2).join(", ")} and ${
              notification.users.length - 2
            } more user liked your tweet!`;
          } else {
            message = `${notification.users.join(" and ")} liked your tweet!`;
          }

          return (
            <div
              className=" border-gray-main-borders border p-3 hover:bg-card-hover-bg cursor-pointer"
              key={index}
            >
              {message}
            </div>
          );
        }
      })}
    </div>
  );
};

export default NotificationFeed;
