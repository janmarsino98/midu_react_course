import React from "react";

const FollowCard = () => {
  return (
    <article className="whoToFollowCard">
      <div className="whoToFollowCard-imgContainer">
        <img src="profilePic" alt="User Profile Picture" />
      </div>
      <div className="whoToFollowCard-userInfoContainer">
        <span className="whoToFollowCard-userInfoContainer-user">
          This is the user name
        </span>
        <span className="whoToFollowCard-userInfoContainer-userName">
          This is the user username
        </span>
      </div>
      <div className="whoToFollowCard-followBtnContainer">
        <button>Follow</button>
      </div>
    </article>
  );
};

export default FollowCard;
