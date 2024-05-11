import { useState, useEffect, useContext } from "react";
import Tweet from "./Tweet";
import { UserContext } from "./CurrentUserContext";
import LoadingTweetFeed from "./loading/LoadingTweetFeed";
import BACK_ADRESS from "../../back_address";
import { SelectedSectionContext } from "./SelectedSectionContext";

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
      //lastForyouTweets is a list of objects (tweets).
      const usernames = [];
      for (let i = 0; i < lastForyouTweets.length; i++) {
        usernames.push(lastForyouTweets[i].username);
      }

      const usersResponse = await fetch(
        `${BACK_ADRESS}/users?usernames=${usernames.join(",")}`
      );

      const usersData = await usersResponse.json();

      const newLastTweets = lastForyouTweets.map((tweet) => {
        const user = usersData.find((user) => user.username === tweet.username);
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

  // const fetchLastFollowingTweets = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(
  //       `${BACK_ADRESS}/${currentUser.username}/last_following_tweets`
  //     );
  //     const lastFollowingTweets = await response.json();
  //     //lastFollowingTweets is a list of objects (tweets).
  //     const usernames = [];
  //     for (let i = 0; i < lastFollowingTweets.length; i++) {
  //       usernames.push(lastFollowingTweets[i].username);
  //     }

  //     const usersResponse = await fetch(
  //       `${BACK_ADRESS}/users?usernames=${usernames.join(",")}`
  //     );

  //     const usersData = await usersResponse.json();

  //     const newLastTweets = lastFollowingTweets.map((tweet) => {
  //       const user = usersData.find((user) => user.username === tweet.username);
  //       return {
  //         ...tweet,
  //         name: user.name,
  //         avatar: user.avatar,
  //         is_verified: user.is_verified,
  //       };
  //     });

  //     setLastFollowingTweets(newLastTweets);
  //   } catch (error) {
  //     console.error("Error: ", error);
  //   }
  //   setIsLoading(false);
  // };

  if (isLoading === false) {
    const tweetsToDisplay = forYouSelected
      ? lastForyouTweets
      : lastFollowingTweets;
    return tweetsToDisplay.map((tweet) => {
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

export default ForYouTweetFeed;
