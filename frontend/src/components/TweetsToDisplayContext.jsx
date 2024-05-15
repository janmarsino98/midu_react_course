import { createContext, useContext, useState, useEffect } from "react";
import BACK_ADRESS from "../../back_address";
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
          const response = await fetch(`${BACK_ADRESS}/${endpoint}`);
          const lastTweets = await response.json();
          let usernames = new Set();
          lastTweets.forEach((tweet) => usernames.add(tweet.username));
          usernames = [...usernames];

          const usersData = await Promise.all(
            usernames.map(async (username) => {
              let userData = getFromCache(`user_${username}`);
              if (!userData) {
                const response = await fetch(`${BACK_ADRESS}/user/${username}`);
                userData = await response.json();
                saveInCache(`user_${username}`, userData);
              }
              return userData;
            })
          );

          const TweetsWithUserData = lastTweets.map((tweet) => {
            const userData = usersData.find(
              (user) => user.username == tweet.username
            );
            return { ...userData, ...tweet };
          });

          forYouSelected
            ? setForYouTweets(TweetsWithUserData)
            : setLastTweets(TweetsWithUserData);
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