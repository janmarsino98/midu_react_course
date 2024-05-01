import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./CurrentUserContext";
import Tweet from "./Tweet";

const FollowingTweetFeed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);
  const [followingTweets, setFollowingTweets] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/${currentUser.username}/following_last_tweets`
        );
        const data = await response.json();
        setFollowingTweets(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [followingTweets]);

  if (isLoading === true) {
    return <div className="sampleDiv">Loading</div>;
  } else {
    followingTweets.map((tweet) => {
      const likedByCurrentUser = tweet.liked_by.includes(currentUser.username);
      return (
        <Tweet
          key={tweet._id}
          tweetId={tweet._id}
          userAvatar={tweet.avatar}
          name={tweet.name}
          username={tweet.username}
          starting_likes={tweet.likes}
          starting_comments={0}
          starting_retweets={tweet.retweets}
          tweetText={tweet.message}
          is_verified={tweet.is_verified}
          likedByCurrentUser={likedByCurrentUser}
        ></Tweet>
      );
    });
  }
};

export default FollowingTweetFeed;
