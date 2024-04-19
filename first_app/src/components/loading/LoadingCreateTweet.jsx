import React from "react";
import defaultAvatar from "../../assets/default_user.jpg";

const LoadingCreateTweet = () => {
  return (
    <>
      <div className="tf-NewTweet-container">
        <div className="tf-avatar-container">
          <img src={defaultAvatar} alt="avatar" />
        </div>
        <div className="tf-body-container">
          <div className="tf-body-message">
            <form id="tweetForm" method="Post">
              <textarea placeholder="Start tweeting..."></textarea>
            </form>
          </div>
          <div className="tf-body-others">
            <div className="tf-body-others-icons"></div>
            <div className="tf-body-others-button">
              <button type="submit" form="tweetForm" disabled={true}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingCreateTweet;
