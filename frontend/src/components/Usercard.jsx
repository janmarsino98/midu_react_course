import { React, useState } from "react";

const Usercard = ({ name, userName, userNumber }) => {
  const [following, setIsFollowing] = useState(false);

  const handleOnClick = () => {
    setIsFollowing(!following);
  };
  return (
    <div className="flex flex-wrap flex-row gap-2 items-center h-max">
      <img
        src={`https://avatars.githubusercontent.com/u/${userNumber}?v=4`}
        alt={`${name} profile picture`}
      />
      <div className="flex flex-wrap justify-between w-full">
        <div className="flex flex-wrap flex-col items-stretch">
          <h2>{name}</h2>
          <span>@{userName}</span>
        </div>
        <button
          className="border border-white rounded-lg text-2xl px-1 py-4 font-bold cursor-pointer"
          onClick={handleOnClick}
        >
          {following ? "Siguiendo" : "Seguir"}
        </button>
      </div>
    </div>
  );
};

export default Usercard;
