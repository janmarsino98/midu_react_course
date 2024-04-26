import React from "react";
import LoadingTweet from "./LoadingTweet";

const LoadingTweetFeed = () => {
  const desiredLoadedTweets = [1, 2];
  return (
    <>
      {desiredLoadedTweets.map((index) => {
        return <LoadingTweet key={index}></LoadingTweet>;
      })}
    </>
  );
};
export default LoadingTweetFeed;
