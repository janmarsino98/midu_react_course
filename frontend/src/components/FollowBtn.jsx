import React, { useContext, useState } from "react";
import { UserContext } from "./CurrentUserContext";
import BACK_ADRESS from "../../back_address";

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
        `${BACK_ADRESS}/${currentUser.username}/${
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
        " px-3 hover:px-2 rounded-3xl font-bold  min-h-8 text-btn" +
        (following
          ? " w-40 bg-black text-white border border-white hover:border hover:border-btn-red-border hover:text-red-500"
          : " bg-white text-black")
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
