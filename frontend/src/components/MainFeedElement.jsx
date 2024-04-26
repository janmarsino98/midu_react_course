import LastTweets from "./TweetFeed";
import CreateTweet from "./CreateTweet";
import { useState, useEffect } from "react";

// I write something --> I click submit --> UseEffect should fetch data once again and reload component

const MainFeedElement = () => {
  //State inizialization
  const [tweets, setTweets] = useState([]);

  //Handle submit function -> This function adds the new tweet to the previous tweets
  const handleSubmit = (newTweet) => {
    setTweets((prevTweets) => [newTweet, ...prevTweets]);
  };

  return (
    <>
      <CreateTweet onTweetSubmit={handleSubmit}></CreateTweet>
      <LastTweets tweets={tweets}></LastTweets>
    </>
  );
};

export default MainFeedElement;
