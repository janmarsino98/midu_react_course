import { useState, useEffect, useContext } from "react";
import Tweet from "./Tweet";
import UserContext from "./CurrentUserContext";
import LoadingTweetFeed from "./loading/LoadingTweetFeed";

const LastTweets = ({ tweets }) => {
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
      const lastTweetsWithAvatars = await Promise.all(
        lastTweets.map(async (tweet) => {
          const avatar_response = await fetch(
            `http://localhost:5000/user/${tweet.username}`
          );
          const user = await avatar_response.json();
          return { ...tweet, avatar: user.avatar };
        })
      );
      setLastTweets(lastTweetsWithAvatars);
    } catch (error) {
      console.error("Error: ", error);
    }
    setIsLoading(false);
  };
  if (isLoading === false) {
    return lastTweets.map((tweet, index) => {
      const likedByCurrentUser = tweet.liked_by.includes(currentUser.username);
      return (
        <Tweet
          key={tweet._id + index}
          tweetId={tweet._id}
          name={tweet.name}
          userName={tweet.username}
          tweetText={tweet.message}
          starting_likes={tweet.likes ? tweet.likes : 0}
          starting_retweets={tweet.retweets ? tweet.retweets : 0}
          starting_comments={0}
          userAvatar={tweet.avatar}
          likedByCurrentUser={likedByCurrentUser}
        />
      );
    });
  } else {
    return <LoadingTweetFeed></LoadingTweetFeed>;
  }
};

export default LastTweets;
