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

function App() {
  return (
    <UserProvider>
      <div className="app-container">
        <header>
          <PrincipalNav></PrincipalNav>
        </header>
        <main>
          <CreateTweet></CreateTweet>
          <LastTweetsProvider>
            <TweetFeedCopy></TweetFeedCopy>
          </LastTweetsProvider>
        </main>
        <div className="right-container">
          <SearchBar></SearchBar>
          <CTAPremium></CTAPremium>
          <WhoToFollow usernames={["wiskys98", "user2"]}></WhoToFollow>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
