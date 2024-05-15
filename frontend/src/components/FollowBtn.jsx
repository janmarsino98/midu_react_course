import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./CurrentUserContext";
import BACK_ADRESS from "../../back_address";

const FollowBtn = ({ children, usernameToFollow }) => {
  const { currentUser } = useContext(UserContext);
  const [following, setFollowing] = useState(null);
  const [hover, setHover] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchFollowingState = async () => {
      if (currentUser) {
        try {
          const response = await fetch(
            `${BACK_ADRESS}/${currentUser.username}/follows/${usernameToFollow}`
          );
          const data = await response.json();
          setFollowing(data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchFollowingState();
  }, []);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await fetch(
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
        "rounded-3xl font-bold  min-h-8 text-btn" +
        (following
          ? " min-w-38 px-2 bg-black text-white border border-white hover:border hover:border-btn-red-border hover:text-red-500"
          : " bg-white text-black px-4")
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
