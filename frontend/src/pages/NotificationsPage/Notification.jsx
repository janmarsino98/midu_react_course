import React from "react";

const Notification = ({ type, users, tweet }) => {
  let tweet_message;
  if (users.length >= 4) {
    tweet_message = `${users.slice(0, 2).join(", ")} and ${
      users.length - 2
    } more users ${type}d your tweet!`;
  } else if (users.length == 3) {
    tweet_message = `${users.slice(0, 2).join(", ")} and ${
      users.length - 2
    } more user ${type}d your tweet!`;
  } else {
    tweet_message = `${users.join(" and ")} ${type}d your tweet!`;
  }

  return (
    <div className=" border-gray-main-borders border p-3 hover:bg-card-hover-bg cursor-pointer">
      {tweet_message}
    </div>
  );
};

export default Notification;
