import { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

const TweetFeed = ({
  tweetId,
  userAvatar,
  name,
  userName,
  tweetText,
  starting_likes,
  starting_retweets,
  starting_comments,
  likedByCurrentUser,
}) => {
  const [reposted, setReposted] = useState(false);
  const [isLiked, setisLiked] = useState(likedByCurrentUser);
  const [likes, setLikes] = useState(starting_likes);
  const [retweets, setRetweets] = useState(starting_retweets);
  const [currentUser, setCurrentUser] = useState("wiskys98");

  const handleLike = async (tweetId) => {
    setisLiked(!isLiked);
    if (isLiked) {
      console.log(
        `http://localhost:5000/${currentUser}/tweet_unlike/${tweetId}`
      );
      setLikes(likes - 1);
      try {
        const response = await fetch(
          `http://localhost:5000/${currentUser}/tweet_unlike/${tweetId}`,
          {
            method: "PUT",
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      setLikes(likes + 1);

      try {
        const response = await fetch(
          `http://localhost:5000/${currentUser}/tweet_like/${tweetId}`,
          {
            method: "PUT",
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
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
        <img src={userAvatar} alt={`${name} profile pic`} />
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
            <div className="tf-Tweet-bodyContainer-options-btn">
              <FiMessageCircle color="white" />
            </div>
            <div className="comments">
              <span>{starting_comments}</span>
            </div>
          </div>
          <div
            className="tf-Tweet-bodyContainer-options-container"
            onClick={handleRetweet}
          >
            <div className="tf-Tweet-bodyContainer-options-btn">
              <AiOutlineRetweet color={reposted ? "green" : "white"} />
            </div>
            <div className="retweets">
              <span>{retweets}</span>
            </div>
          </div>
          <div
            className="tf-Tweet-bodyContainer-options-container"
            onClick={() => handleLike(tweetId)}
          >
            <div className="tf-Tweet-bodyContainer-options-btn">
              <FaRegHeart color={isLiked ? "red" : "white"} />
            </div>
            <div className="likes">
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TweetFeed;
