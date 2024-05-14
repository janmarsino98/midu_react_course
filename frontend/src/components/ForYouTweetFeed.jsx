import { useState, useEffect, useContext } from "react";
import Tweet from "./Tweet";
import { UserContext } from "./CurrentUserContext";
import LoadingTweetFeed from "./loading/LoadingTweetFeed";
import BACK_ADRESS from "../../back_address";
import { SelectedSectionContext } from "./SelectedSectionContext";
import { getFromCache, saveInCache } from "../cache";

const ForYouTweetFeed = () => {
  const [lastForyouTweets, setLastForyouTweets] = useState([]);
  const [lastFollowingTweets, setLastFollowingTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);
  const { forYouSelected } = useContext(SelectedSectionContext);
  useEffect(() => {
    fetchLastForyouTweets();
  }, [currentUser, forYouSelected]);

  const fetchLastForyouTweets = async () => {
    setIsLoading(true);
    const endpoint = forYouSelected
      ? "last_tweets"
      : `${currentUser.username}/last_following_tweets`;

    try {
      const response = await fetch(`${BACK_ADRESS}/${endpoint}`);
      const lastForyouTweets = await response.json();

      let usernames = new Set();
      lastForyouTweets.forEach((tweet) => usernames.add(tweet.username));
      usernames = [...usernames];
      console.log("Last Tweets: ", lastForyouTweets);

      const usersData = await Promise.all(
        usernames.map(async (username) => {
          console.log("Fetching user ", username);
          let userData = getFromCache(`user_${username}`);
          if (!userData) {
            const response = await fetch(
              `${BACK_ADRESS}/users?username=${username}`
            );
            userData = await response.json();
            saveInCache(`user_${username}`, userData);
          }
          return userData;
        })
      );

      usersData.forEach((user) => console.log("User", user));

      const newLastTweets = lastForyouTweets.map((tweet) => {
        console.log(tweet);
        const user = usersData.find((user) => user.username === tweet.username);
        console.log("Found user: ", user);
        console.log(usersData);
        console.log("Tweet username: ", tweet.username);
        return {
          ...tweet,
          name: user.name,
          avatar: user.avatar,
          is_verified: user.is_verified,
        };
      });

      forYouSelected
        ? setLastForyouTweets(newLastTweets)
        : setLastFollowingTweets(newLastTweets);
    } catch (error) {
      console.error("Error: ", error);
    }
    setIsLoading(false);
  };

  if (isLoading === false) {
    const tweetsToDisplay = forYouSelected
      ? lastForyouTweets
      : lastFollowingTweets;
    return tweetsToDisplay.map((tweet) => {
      return (
        <Tweet
          key={tweet._id}
          tweetId={tweet._id}
          name={tweet.name}
          userName={tweet.username}
          tweetText={tweet.message}
          starting_likes={tweet.likes}
          starting_retweets={tweet.retweets}
          starting_comments={0}
          userAvatar={tweet.avatar}
          is_verified={tweet.is_verified}
        />
      );
    });
  } else {
    return <LoadingTweetFeed></LoadingTweetFeed>;
  }
};

export default ForYouTweetFeed;
