import "./App.css";
import CreateTweet from "./components/CreateTweet";
import PrincipalNav from "./components/PrincipalNav";
import TweetFeed from "./components/TweetFeed";
import UserContext from "./components/CurrentUserContext";
import CurrentUserSection from "./components/CurrentUserSection";
import MainFeedElement from "./components/MainFeedElement";
import useCurrentUser from "./hooks/useCurrentUser";
import { useEffect } from "react";
import LoadingTweetFeed from "./components/loading/LoadingTweetFeed";
import LoadingTweet from "./components/loading/LoadingTweet";
import LoadingCreateTweet from "./components/loading/LoadingCreateTweet";
import FollowCard from "./components/FollowCard";
import WhoToFollow from "./components/WhoToFollow";

function App() {
  const currentUserUsername = "rasbt";
  const currentUserInfo = useCurrentUser(currentUserUsername);
  useEffect(() => {}, [currentUserInfo]);
  return (
    <>
      <UserContext.Provider value={currentUserInfo}>
        <header>
          <PrincipalNav></PrincipalNav>
        </header>
        <main>
          <CreateTweet></CreateTweet>
          <TweetFeed></TweetFeed>
          <WhoToFollow></WhoToFollow>
        </main>
      </UserContext.Provider>
      {/* <TweetFeed></TweetFeed> */}
      {/* <UserContext.Provider value={currentUserInfo}>
        <header>
          <PrincipalNav></PrincipalNav>
        </header>
        <main>
          <CurrentUserSection></CurrentUserSection>
          <MainFeedElement></MainFeedElement>
          <CreateTweet></CreateTweet>
          <LastTweets></LastTweets>
        </main>
      </UserContext.Provider> */}
    </>
  );
}

export default App;
