import React, { useContext, useState } from "react";
import { UserContext } from "./CurrentUserContext";

const UnfollowBtn = ({ children, usernameToUnfollow }) => {
  const { currentUser } = useContext(UserContext);
  const [hover, setHover] = useState(false);
  const handleClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/${currentUser.username}/unfollow/${usernameToFollow}`,
        { method: "PUT" }
      );
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <button
      className="followBtn following"
      onClick={() => handleClick()}
      onPointerEnter={() => setHover(!hover)}
      onPointerLeave={() => setHover(!hover)}
    >
      {hover ? "Dejar de seguir" : "Siguiendo"}
    </button>
  );
};

export default UnfollowBtn;
