import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
const FollowCard = ({ name, username, avatar, is_verified, children }) => {
  return (
    <div className="flex flex-row w-full px-3 py-4 justify-center align-center bg-black">
      <div className="flex flex-col max-w-12 rounded-full mr-2">
        <img src={avatar} alt="User Profile Picture" />
      </div>
      <div className="flex flex-col mr-2 w-1/10">
        <span className=" font-bold text-white">
          {name}{" "}
          {is_verified && (
            <RiVerifiedBadgeFill color="rgb(29, 155, 240)"></RiVerifiedBadgeFill>
          )}
        </span>
        <span className=" text-gray-username">{`@${username}`}</span>
      </div>
      {children}
    </div>
  );
};

export default FollowCard;
