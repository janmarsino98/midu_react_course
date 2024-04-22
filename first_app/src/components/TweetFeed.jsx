import { useState, useEffect, useContext } from "react";
import Tweet from "./Tweet";
import UserContext from "./CurrentUserContext";
import LoadingTweetFeed from "./loading/LoadingTweetFeed";

const TweetFeed = ({ tweets }) => {
  const [lastTweets, setLastTweets] = useState(tweets);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useContext(UserContext);
  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/last_tweets");
      const lastTweets = await response.json();
      //lastTweets is a list of objects (tweets).
      const usernames = [];
      for (let i = 0; i < lastTweets.length; i++) {
        usernames.push(lastTweets[i].username);
      }

      const usersResponse = await fetch(
        `http://localhost:5000/users?usernames=${usernames.join(",")}`
      );

      const usersData = await usersResponse.json();

      const newLastTweets = lastTweets.map((tweet) => {
        const user = usersData.find((user) => user.username === tweet.username);
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
    }
    setIsLoading(false);
  };
  if (isLoading === false) {
    return lastTweets.map((tweet) => {
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
  } else {
    return <LoadingTweetFeed></LoadingTweetFeed>;
  }
};

export default TweetFeed;
