import React, { useContext, useState, useEffect } from "react";
import { LastTweetsContext } from "./LastTweetsContext";
import { GiSteamBlast } from "react-icons/gi";

const TweetFeedCopy = () => {
  const { lastTweets, setLastTweets } = useContext(LastTweetsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const getUsers = () => {
      const newUsernames = lastTweets.map((tweet) => tweet.username);
      setUsernames(newUsernames);
    };
    getUsers();
    console.log(`${usernames.length} users loaded...`);
  }, [lastTweets]);

  useEffect(() => {
    const getTweets = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/users?usernames=${usernames.join(",")}`
        );
        const data = await response.json();
        const newLastTweets = lastTweets.map((tweet) => {
          const user = data.find((user) => user.username === tweet.username);
          return {
            ...tweet,
            name: user.name,
            avatar: user.avatar,
            is_verified: user.is_verified,
          };
        });
        setLastTweets(newLastTweets);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (usernames.length > 0) {
      getTweets();
    }
  }, []);

  if (isLoading) {
    return <div className="trialDiv">LOADING...</div>;
  } else {
    return usernames.map((username, index) => {
      console.log("username: ", username);
      return (
        <div className="sampleDiv" key={index}>
          {username}
        </div>
      );
    });
  }
};

export default TweetFeedCopy;
