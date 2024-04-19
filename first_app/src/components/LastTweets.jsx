import { useState, useEffect, useContext } from "react";
import TweetFeed from "./TweetFeed";
import UserContext from "./CurrentUserContext";

const LastTweets = () => {
  const [lastTweets, setLastTweets] = useState([]);
  const currentUser = useContext(UserContext);

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
    console.log(tweet.liked_by.includes(currentUser));
    const likedByCurrentUser = tweet.liked_by.includes(currentUser);
    return (
      <TweetFeed
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
};

export default LastTweets;
