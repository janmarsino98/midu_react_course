import { useState, useContext, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { UserContext } from "./CurrentUserContext";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const Tweet = ({
  tweetId,
  userAvatar,
  name,
  userName,
  tweetText,
  starting_likes,
  starting_retweets,
  starting_comments,
  likedByCurrentUser,
  is_verified,
}) => {
  const [isRetweeted, setisRetweeted] = useState(false);
  const [isLiked, setIsLiked] = useState(likedByCurrentUser);
  const [likes, setLikes] = useState(starting_likes);
  const [retweets, setRetweets] = useState(starting_retweets);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchRetweetStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/${currentUser.username}/tweet_retweet_status/${tweetId}`
        );
        const data = await response.json();
        setisRetweeted(data.retweeted_by_user);
      } catch (error) {
        console.error(
          "Erorr while trying to get retweet status from a tweet :",
          error
        );
      }
    };
    fetchRetweetStatus();
  }, [currentUser, tweetId]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/${currentUser.username}/tweet_like_status/${tweetId}`
        );
        const data = await response.json();
        setIsLiked(data.liked_by_user);
      } catch (error) {
        console.error("There was an error while fetching: ", error);
      }
    };
    fetchLikeStatus();
  }, [currentUser, tweetId]);

  useEffect(() => {
    const fetchRetweetStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/${currentUser.username}/tweet_retweet_status/${tweetId}`
        );
        const data = await response.json();
        setisRetweeted(data.retweeted_by_user);
      } catch (error) {
        console.error(
          "Erorr while trying to get retweet status from a tweet :",
          error
        );
      }
    };
    fetchRetweetStatus();
  }, [currentUser, tweetId]);

  const handleLike = async (tweetId) => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikes(likes - 1);
      try {
        const response = await fetch(
          `http://localhost:5000/${currentUser.username}/tweet_unlike/${tweetId}`,
          {
            method: "PUT",
          }
        );
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      setLikes(likes + 1);

      try {
        const response = await fetch(
          `http://localhost:5000/${currentUser.username}/tweet_like/${tweetId}`,
          {
            method: "PUT",
          }
        );
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  const handleRetweet = async () => {
    setisRetweeted(!isRetweeted);
    if (isRetweeted) {
      setRetweets(retweets - 1);
      try {
        const response = await fetch(
          `http://localhost:5000/${currentUser.username}/tweet_unretweet/${tweetId}`,
          {
            method: "PUT",
          }
        );
      } catch (error) {
        console.error("There was an error while unretweeting a tweet: ", error);
      }
    } else {
      setRetweets(retweets + 1);

      try {
        const response = await fetch(
          `http://localhost:5000/${currentUser.username}/tweet_retweet/${tweetId}`,
          {
            method: "PUT",
          }
        );
      } catch (error) {
        console.error("Error while trying to retweet a tweet: ", error);
      }
    }
  };

  return (
    <article>
      <div className="flex flex-wrap flex-col py-2">
        <img
          className="rounded-full w-16"
          src={userAvatar}
          alt={`${name} profile pic`}
        />
      </div>
      <div className="text-white w-full">
        <div className="flex flex-wrap flex-row">
          <h2>
            {name}{" "}
            {is_verified && (
              <RiVerifiedBadgeFill color="rgb(29, 155, 240)"></RiVerifiedBadgeFill>
            )}
          </h2>
          <span>@{userName}</span>
        </div>
        <div className="text-white">
          <p>{tweetText}</p>
        </div>
        <div className="p-2 flex flex-wrap flex-row justify-between items-center">
          <div className="flex flex-wrap flex-row text-white cursor-pointer items-center gap-1">
            <div className="flex flex-wrap items-center h-full">
              <FiMessageCircle color="white" />
            </div>
            <div className="comments">
              <span>{starting_comments}</span>
            </div>
          </div>
          <div
            className="flex flex-wrap flex-row text-white cursor-pointer items-center gap-1"
            onClick={handleRetweet}
          >
            <div className="tf-Tweet-bodyContainer-options-btn">
              <AiOutlineRetweet color={isRetweeted ? "green" : "white"} />
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

export default Tweet;
