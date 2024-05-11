import React from "react";
import LoadingTweet from "./LoadingTweet";

const LoadingTweetFeed = () => {
  const desiredLoadedTweets = [1, 2, 3];
  return (
    <div className="flex flex-col w-full">
      {desiredLoadedTweets.map((tweet, index) => {
        return <LoadingTweet key={index}></LoadingTweet>;
      })}
    </div>
  );
};
export default LoadingTweetFeed;
