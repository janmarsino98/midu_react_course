import { useState, useEffect, createContext } from "react";

export const LastTweetsContext = createContext();

export const LastTweetsProvider = ({ children }) => {
  const [lastTweets, setLastTweets] = useState([]);

  useEffect(() => {
    const fetchLastTweets = async () => {
      try {
        const response = await fetch("http://localhost:5000/last_tweets");
        const newLastTweets = await response.json();
        setLastTweets(newLastTweets);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchLastTweets();
  }, []);

  useEffect(() => {
    if (lastTweets && lastTweets.length > 0) {
      console.log(lastTweets);
    }
  });

  return (
    <LastTweetsContext.Provider value={{ lastTweets, setLastTweets }}>
      {children}
    </LastTweetsContext.Provider>
  );
};
