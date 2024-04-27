import React, { useContext } from "react";
import { UserContext } from "./CurrentUserContext";

const FollowBtn = ({ children, usernameToFollow }) => {
  const { currentUser } = useContext(UserContext);
  const handleClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/${currentUser.username}/follow/${usernameToFollow}`,
        { method: "PUT" }
      );
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <button className="followBtn" onClick={() => handleClick()}>
      Seguir
    </button>
  );
};

export default FollowBtn;
