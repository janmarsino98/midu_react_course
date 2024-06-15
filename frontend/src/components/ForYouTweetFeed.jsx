import { useContext, useEffect } from "react";
import Tweet from "../components/Tweet/Tweet";
import { SelectedSectionContext } from "../contexts/SelectedSectionContext";
import { TweetsContext } from "../contexts/TweetsToDisplayContext";

const ForYouTweetFeed = () => {
  const { forYouSelected } = useContext(SelectedSectionContext);
  const { forYouTweets, lastTweets } = useContext(TweetsContext);

  const tweetsToDisplay = forYouSelected ? forYouTweets : lastTweets;
  return tweetsToDisplay.map((tweet) => {
    console.log(tweet);
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
};

export default ForYouTweetFeed;
