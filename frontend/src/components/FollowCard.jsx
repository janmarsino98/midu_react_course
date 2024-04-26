import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
const FollowCard = ({ name, username, avatar, is_verified, children }) => {
  return (
    <div className="whoToFollowCard">
      <div className="whoToFollowCard-imgContainer">
        <img src={avatar} alt="User Profile Picture" />
      </div>
      <div className="whoToFollowCard-userInfoContainer">
        <span className="whoToFollowCard-userInfoContainer-user">
          {name}{" "}
          {is_verified && (
            <RiVerifiedBadgeFill color="rgb(29, 155, 240)"></RiVerifiedBadgeFill>
          )}
        </span>
        <span className="whoToFollowCard-userInfoContainer-userName">
          {`@${username}`}
        </span>
      </div>
      {children}
    </div>
  );
};

export default FollowCard;
