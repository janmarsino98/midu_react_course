import { createContext, useContext, useState, useEffect } from "react";
import axios from "../../back_address";
import { SelectedSectionContext } from "./SelectedSectionContext";
import { UserContext } from "./CurrentUserContext";
import { getFromCache, saveInCache } from "../cache";

export const TweetsContext = createContext();

export const TweetsContextProvider = ({ children }) => {
  const { forYouSelected } = useContext(SelectedSectionContext);
  const { currentUser } = useContext(UserContext);
  const [lastTweets, setLastTweets] = useState([]);
  const [forYouTweets, setForYouTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      if (currentUser) {
        const endpoint = forYouSelected
          ? "last_tweets"
          : `${currentUser.username}/last_following_tweets`;
        try {
          const response = await axios.get(`/${endpoint}`);
          const tweetsData = response.data;
          let usernames = new Set();
          tweetsData.forEach((tweet) => usernames.add(tweet.username));
          usernames = [...usernames];

          const usersData = await Promise.all(
            usernames.map(async (username) => {
              let userData = getFromCache(`user_${username}`);
              if (!userData) {
                const userResponse = await axios.get(`/user/${username}`);
                userData = userResponse.data;
                saveInCache(`user_${username}`, userData);
              }
              return userData;
            })
          );

          const TweetsWithUserData = tweetsData.map((tweet) => {
            const userData = usersData.find(
              (user) => user.username === tweet.username
            );
            return { ...userData, ...tweet };
          });

          if (forYouSelected) {
            setForYouTweets(TweetsWithUserData);
          } else {
            setLastTweets(TweetsWithUserData);
          }
        } catch (error) {
          console.error("Error while fetching: ", error);
        }
      }
    };
    fetchTweets();
  }, [currentUser, forYouSelected]);

  return (
    <TweetsContext.Provider
      value={{ forYouTweets, lastTweets, setForYouTweets, setLastTweets }}
    >
      {children}
    </TweetsContext.Provider>
  );
};
