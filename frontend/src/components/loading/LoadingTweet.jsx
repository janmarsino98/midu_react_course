import React from "react";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import defaultAvatar from "../../assets/default_user.jpg";

const LoadingTweetFeed = () => {
  return (
    <article>
      <div className="tf-Tweet-imgContainer">
        <img src={defaultAvatar} alt={`user profile pic`} />
      </div>
      <div className="tf-Tweet-bodyContainer">
        <div className="tf-Tweet-bodyContainer-header">
          <h2>name</h2>
          <span>@username</span>
        </div>
        <div className="tf-Tweet-bodyContainer-text">
          <p>...</p>
        </div>
        <div className="tf-Tweet-bodyContainer-options">
          <div className="tf-Tweet-bodyContainer-options-container">
            <div className="tf-Tweet-bodyContainer-options-btn">
              <FiMessageCircle color="white" />
            </div>
            <div className="comments">
              <span>0</span>
            </div>
          </div>
          <div className="tf-Tweet-bodyContainer-options-container">
            <div className="tf-Tweet-bodyContainer-options-btn">
              <AiOutlineRetweet color="white" />
            </div>
            <div className="retweets">
              <span>0</span>
            </div>
          </div>
          <div className="tf-Tweet-bodyContainer-options-container">
            <div className="tf-Tweet-bodyContainer-options-btn">
              <FaRegHeart color="white" />
            </div>
            <div className="likes">
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LoadingTweetFeed;
