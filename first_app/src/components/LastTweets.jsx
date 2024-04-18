import { useState, useEffect } from "react";
import TweetFeed from "./TweetFeed";

const LastTweets = () => {
  const [lastTweets, setLastTweets] = useState([[]]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/last_tweets");
        const last_tweets = await response.json();
        setLastTweets(last_tweets);
        console.log(last_tweets);
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
        userAvatar={"none"}
        name={tweet.name}
        userName={tweet.username}
        tweetText={tweet.message}
        starting_likes={tweet.likes ? tweet.likes : 0}
        starting_retweets={tweet.retweets ? tweet.retweets : 0}
        starting_comments={0}
      />
    );
  });
};

export default LastTweets;
