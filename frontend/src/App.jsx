import "./App.css";
import CreateTweet from "./components/CreateTweet";
import PrincipalNav from "./components/PrincipalNav";
import TweetFeed from "./components/TweetFeed";
import { UserProvider } from "./components/CurrentUserContext";
import useCurrentUser from "./hooks/useCurrentUser";
import WhoToFollow from "./components/WhoToFollow";
import SearchBar from "./components/SearchBar";
import CTAPremium from "./components/CTAPremium";
import { LastTweetsContext } from "./components/LastTweetsContext";
import TweetFeedCopy from "./components/TweetFeedCopy";
import { LastTweetsProvider } from "./components/LastTweetsContext";
import TweetKind from "./components/TweetKind";
import { useState } from "react";

function App() {
  const [showFollowingFeed, setShowFollowingFeed] = useState(false);

  const handleTweetKindChange = (isFollowingFeed) => {
    setShowFollowingFeed(isFollowingFeed);
  };

  return (
    <UserProvider>
      <div className="app-container">
        <header>
          <PrincipalNav></PrincipalNav>
        </header>
        <main>
          <LastTweetsProvider>
            <TweetKind onTweetKindChange={handleTweetKindChange}></TweetKind>
            <CreateTweet
              onTweetSubmit={() => console.log("Submited...")}
            ></CreateTweet>
            <TweetFeedCopy></TweetFeedCopy>
          </LastTweetsProvider>
        </main>
        <div className="right-container">
          <SearchBar></SearchBar>
          <CTAPremium></CTAPremium>
          <WhoToFollow></WhoToFollow>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
