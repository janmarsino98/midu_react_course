import React, { useContext } from "react";
import { UserContext } from "./CurrentUserContext";

const NotificationFeed = () => {
  const { currentUser } = useContext(UserContext);

  {
    if (currentUser) {
      console.log("Entering....");
      console.log(currentUser.username);
      currentUser.unread_notifications.map((notification, index) => {
        return <div key={index}>{notification}</div>;
      });
    }
  }
};

export default NotificationFeed;
