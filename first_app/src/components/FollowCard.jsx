import React from "react";

const FollowCard = ({ name, username, avatar }) => {
  return (
    <div className="whoToFollowCard">
      <div className="whoToFollowCard-imgContainer">
        <img src={avatar} alt="User Profile Picture" />
      </div>
      <div className="whoToFollowCard-userInfoContainer">
        <span className="whoToFollowCard-userInfoContainer-user">{name}</span>
        <span className="whoToFollowCard-userInfoContainer-userName">
          {`@${username}`}
        </span>
      </div>
      <div className="whoToFollowCard-followBtnContainer">
        <button>Follow</button>
      </div>
    </div>
  );
};

export default FollowCard;
