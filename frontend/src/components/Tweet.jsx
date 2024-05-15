import { useState, useContext, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { UserContext } from "./CurrentUserContext";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import BACK_ADRESS from "../../back_address";

const Tweet = ({
  tweetId,
  userAvatar,
  name,
  userName,
  tweetText,
  starting_likes,
  starting_retweets,
  starting_comments,
  is_verified,
}) => {
  const [isRetweeted, setisRetweeted] = useState(false);
  const [isLiked, setIsLiked] = useState(null);
  const [likes, setLikes] = useState(starting_likes);
  const [retweets, setRetweets] = useState(starting_retweets);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await fetch(
          `${BACK_ADRESS}/${currentUser.username}/likes/${tweetId}`
        );
        const data = await response.json();
        setIsLiked(data);
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
          `${BACK_ADRESS}/${currentUser.username}/retweeted/${tweetId}`
        );
        const data = await response.json();
        setisRetweeted(data);
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
        await fetch(
          `${BACK_ADRESS}/${currentUser.username}/tweet_unlike/${tweetId}`,
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
        await fetch(
          `${BACK_ADRESS}/${currentUser.username}/tweet_like/${tweetId}`,
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
        await fetch(
          `${BACK_ADRESS}/${currentUser.username}/tweet_unretweet/${tweetId}`,
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
        await fetch(
          `${BACK_ADRESS}/${currentUser.username}/tweet_retweet/${tweetId}`,
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
    <article className="border border-gray-main-borders px-4 h-max">
      <div className="text-white w-full flex flex-row ">
        <div className="flex flex-col py-2 mr-2">
          <img
            className="rounded-full w-12"
            src={userAvatar}
            alt={`${name} profile pic`}
          />
        </div>
        <div className="flex flex-col w-full max-w-[540.875px] py-3">
          <div className="flex flex-row w-full">
            <h2 className="flex flex-row items-center font-bold text-tweet">
              {name}
              {is_verified && (
                <RiVerifiedBadgeFill
                  className="ml-1"
                  color="rgb(29, 155, 240)"
                ></RiVerifiedBadgeFill>
              )}
            </h2>
            <span className="text-tweet-feed-light-gray text-tweet ml-1">
              @{userName}
            </span>
          </div>
          <div className="max-w-full break-words whitespace-normal">
            <p>{tweetText}</p>
          </div>
          <div className="p-2 flex flex-wrap flex-row justify-between items-stretch">
            <div className="flex flex-wrap flex-row text-white cursor-pointer items-stretch gap-1">
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
      </div>
    </article>
  );
};

export default Tweet;
