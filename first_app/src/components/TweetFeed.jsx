import { React, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const TweetFeed = ({
  userNumber,
  name,
  userName,
  tweetText,
  starting_likes,
  starting_retweets,
  starting_comments,
}) => {
  const [reposted, setReposted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(starting_likes);
  const [retweets, setRetweets] = useState(starting_retweets);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleRetweet = () => {
    if (reposted) {
      setRetweets(retweets - 1);
    } else {
      setRetweets(retweets + 1);
    }
    setReposted(!reposted);
  };

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
          <div className="tf-Tweet-bodyContainer-options-container">
            <button className="tf-Tweet-bodyContainer-options-btn">
              <FiMessageCircle color="white" />
            </button>
            <p className="comments">{starting_comments}</p>
          </div>
          <div className="tf-Tweet-bodyContainer-options-container">
            <button
              className="tf-Tweet-bodyContainer-options-btn"
              onClick={handleRetweet}
            >
              <FaRetweet size={"15px"} color={reposted ? "green" : "white"} />
            </button>
            <p className="retweets">{retweets}</p>
          </div>
          <div className="tf-Tweet-bodyContainer-options-container">
            <button
              className="tf-Tweet-bodyContainer-options-btn"
              onClick={handleLike}
            >
              <FaRegHeart color={liked ? "red" : "white"} />
            </button>
            <p className="likes">{likes}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TweetFeed;
