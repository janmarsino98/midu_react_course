import React, { useContext, useState, useEffect } from "react";
import { LastTweetsContext } from "./LastTweetsContext";
import Tweet from "./Tweet";
import { UserContext } from "./CurrentUserContext";
import LoadingTweetFeed from "./loading/LoadingTweetFeed";

const TweetFeedCopy = () => {
  const { lastTweets, setLastTweets } = useContext(LastTweetsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [usernamesLoaded, setUsernamesLoaded] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getUsers = () => {
      if (lastTweets) {
        const newUsernames = lastTweets.map((tweet) => tweet.username);
        setUsernames(newUsernames);
      }
    };
    getUsers();
  }, [lastTweets]);

  useEffect(() => {
    if (usernames.length > 0) {
      setUsernamesLoaded(true);
    }
  }, [usernames]);

  useEffect(() => {
    if (!usernamesLoaded) {
      setIsLoading(true);
      console.log("Still not loaded....");
      return;
    }
    const getTweets = async () => {
      console.log("Getting tweets...");
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/users?usernames=${usernames.join(",")}`
        );
        const data = await response.json();
        const newLastTweets = lastTweets.map((tweet) => {
          const user = data.find((user) => user.username === tweet.username);
          return {
            ...tweet,
            name: user.name,
            avatar: user.avatar,
            is_verified: user.is_verified,
          };
        });
        setLastTweets(newLastTweets);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (usernames && usernames.length > 0) {
      getTweets();
    }
  }, [usernamesLoaded]);

  if (isLoading || !lastTweets) {
    return <LoadingTweetFeed></LoadingTweetFeed>;
  } else {
    return lastTweets.map((tweet, index) => {
      const likedByCurrentUser = tweet.liked_by.includes(currentUser.username);
      return (
        <Tweet
          key={tweet._id}
          tweetId={tweet._id}
          name={tweet.name}
          userName={tweet.username}
          tweetText={tweet.message}
          starting_likes={tweet.likes ? tweet.likes : 0}
          starting_retweets={tweet.retweets ? tweet.retweets : 0}
          starting_comments={0}
          userAvatar={tweet.avatar}
          likedByCurrentUser={likedByCurrentUser}
          is_verified={tweet.is_verified}
        />
      );
    });
  }
};

export default TweetFeedCopy;
