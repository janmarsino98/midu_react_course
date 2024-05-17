import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./CurrentUserContext";
import axios from "../../back_address";

const FollowBtn = ({ children, usernameToFollow }) => {
  const { currentUser } = useContext(UserContext);
  const [following, setFollowing] = useState(null);
  const [hover, setHover] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchFollowingState = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(
            `/${currentUser.username}/follows/${usernameToFollow}}`
          );
          setFollowing(response.data);
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
      await axios.put(
        `/${currentUser.username}/${
          following ? "un" : ""
        }follow/${usernameToFollow}`
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
