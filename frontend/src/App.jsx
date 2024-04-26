import "./App.css";
import CreateTweet from "./components/CreateTweet";
import PrincipalNav from "./components/PrincipalNav";
import TweetFeed from "./components/TweetFeed";
import { UserProvider } from "./components/CurrentUserContext";
import useCurrentUser from "./hooks/useCurrentUser";
import WhoToFollow from "./components/WhoToFollow";
import SearchBar from "./components/SearchBar";
import CTAPremium from "./components/CTAPremium";

function App() {
  return (
    <UserProvider>
      <div className="app-container">
        <header>
          <PrincipalNav></PrincipalNav>
        </header>
        <main>
          <CreateTweet></CreateTweet>
          <TweetFeed></TweetFeed>
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
