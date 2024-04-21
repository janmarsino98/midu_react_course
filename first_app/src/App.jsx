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
    <div className="app-container">
      <UserContext.Provider value={currentUserInfo}>
        <header>
          <PrincipalNav></PrincipalNav>
        </header>
        <main>
          <CreateTweet></CreateTweet>
          <TweetFeed></TweetFeed>
        </main>
        <div className="right-container">
          <WhoToFollow usernames={["wiskys98", "user2"]}></WhoToFollow>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
