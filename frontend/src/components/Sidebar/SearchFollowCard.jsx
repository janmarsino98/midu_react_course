import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const SearchFollowCard = ({
  name,
  username,
  avatar,
  is_verified,
  children,
}) => {
  return (
    <div className="flex flex-row w-full bg-black first:rounded-t-xl last:rounded-b-xl">
      <div className="flex flex-row w-full items-stretch px-3 cursor-pointer py-4 hover:bg-card-hover-bg bg-black first:rounded-t-xl last:rounded-b-xl">
        <div className="flex flex-row items-start">
          <div className="flex mr-1 w-max">
            <img
              className="rounded-full w-14"
              src={avatar}
              alt="User Profile Picture"
            />
          </div>
          <div className="flex flex-col mr-2">
            <span className="flex flex-row items-center font-bold text-white">
              {name}
              {is_verified && (
                <RiVerifiedBadgeFill
                  className="ml-2"
                  color="rgb(29, 155, 240)"
                ></RiVerifiedBadgeFill>
              )}
            </span>
            <span className=" text-gray-username">{`@${username}`}</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SearchFollowCard;
