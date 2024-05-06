import React, { useContext, useState } from "react";
import { UserContext } from "./CurrentUserContext";

const FollowBtn = ({ children, usernameToFollow }) => {
  const { currentUser } = useContext(UserContext);
  const [following, setFollowing] = useState(
    currentUser.following.includes(usernameToFollow)
  );
  const [hover, setHover] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/${currentUser.username}/${
          following ? "un" : ""
        }follow/${usernameToFollow}`,
        { method: "PUT" }
      );
      setFollowing(!following);
    } catch (error) {
      console.error("Error: ", error);
    }
    setIsLoading(false);
  };

  return (
    <button
      className={
        " px-3 rounded-3xl font-bold w-30" +
        (following ? " bg-black text-white border border-white" : "bg-white")
      }
      onClick={() => handleClick()}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      disabled={isLoading}
    >
      {following ? (hover ? "Dejar de seguir" : "Siguiendo") : "Seguir"}
    </button>
  );
};

export default FollowBtn;
