import { React, useState } from "react";

const Usercard = ({ name, userName, userNumber }) => {
  const [following, setIsFollowing] = useState(false);

  const handleOnClick = () => {
    setIsFollowing(!following);
    console.log(following);
  };
  return (
    <div className="tw-followCard-userCard">
      <img
        src={`https://avatars.githubusercontent.com/u/${userNumber}?v=4`}
        alt={`${name} profile picture`}
      />
      <div className="tw-FollowCawrd-userCard-main">
        <div className="tw-followCard-userCard-info">
          <h2>{name}</h2>
          <span>@{userName}</span>
        </div>
        <button
          className="tw-folllow-Card-userCard-btn"
          onClick={handleOnClick}
        >
          {following ? "Siguiendo" : "Seguir"}
        </button>
      </div>
    </div>
  );
};

export default Usercard;
