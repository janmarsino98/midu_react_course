import { React, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const TweetFeed = ({ userNumber, name, userName, tweetText }) => {
  const [reposted, setReposted] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <article>
      <div className="tf-Tweet-imgContainer">
        <img
          src={`https://avatars.githubusercontent.com/u/${userNumber}?v=4`}
          alt={`${name} profile pic`}
        />
      </div>
      <div className="tf-Tweet-bodyContainer">
        <div className="tf-Tweet-bodyContainer-header">
          <h2>{name}</h2>
          <span>@{userName}</span>
        </div>
        <div className="tf-Tweet-bodyContainer-text">
          <p>{tweetText}</p>
        </div>
        <div className="tf-Tweet-bodyContainer-options">
          <button className="tf-Tweet-bodyContainer-options-btn">
            <FiMessageCircle color="white" />
          </button>
          <button
            className="tf-Tweet-bodyContainer-options-btn"
            onClick={() => setReposted(!reposted)}
          >
            <FaRetweet size={"15px"} color={reposted ? "green" : "white"} />
          </button>
          <button
            className="tf-Tweet-bodyContainer-options-btn"
            onClick={() => setLiked(!liked)}
          >
            <FaRegHeart color={liked ? "red" : "white"} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TweetFeed;
