import { useState, useEffect } from "react";
import TweetFeed from "./TweetFeed";

const LastTweets = () => {
  const [lastTweets, setLastTweets] = useState([[]]);
  useEffect(() => {
    const fetchData = async () => {
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
        console.log(lastTweetsWithAvatars);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchData();
  }, []);

  return lastTweets.map((tweet, index) => {
    return (
      <TweetFeed
        key={index}
        name={tweet.name}
        userName={tweet.username}
        tweetText={tweet.message}
        starting_likes={tweet.likes ? tweet.likes : 0}
        starting_retweets={tweet.retweets ? tweet.retweets : 0}
        starting_comments={0}
        userAvatar={tweet.avatar}
      />
    );
  });
};

export default LastTweets;
