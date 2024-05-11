import React from "react";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import defaultAvatar from "../../assets/default_user.jpg";

const LoadingTweetFeed = () => {
  return (
    <article className="flex flex-col border border-gray-main-borders px-4 w-full">
      <div className="flex flex-row">
        <div className="flex flex-wrap flex-col py-2 mr-2">
          <img
            className="rounded-full w-16"
            src={defaultAvatar}
            alt={`user profile pic`}
          />
        </div>
        <div className="flex flex-col w-full text-white py-3">
          <div className="flex flex-row w-full">
            <h2>name</h2>
            <span>@username</span>
          </div>
          <div className="text-white">
            <p>...</p>
          </div>
        </div>
      </div>

      <div>
        <div className="p-2 flex flex-wrap flex-row justify-between items-stretch">
          <div className="flex flex-wrap flex-row text-white cursor-pointer items-stretch gap-1">
            <div className="flex flex-wrap items-center h-full">
              <FiMessageCircle color="white" />
            </div>
            <div className="comments">
              <span>{0}</span>
            </div>
          </div>
          <div className="flex flex-wrap flex-row text-white cursor-pointer items-center gap-1">
            <div className="tf-Tweet-bodyContainer-options-btn">
              <AiOutlineRetweet color={"white"} />
            </div>
            <div className="retweets">
              <span>{0}</span>
            </div>
          </div>
          <div className="tf-Tweet-bodyContainer-options-container">
            <div className="tf-Tweet-bodyContainer-options-btn">
              <FaRegHeart color={"white"} />
            </div>
            <div className="likes">
              <span>{0}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LoadingTweetFeed;
