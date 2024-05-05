import "./App.css";
import CreateTweet from "./components/CreateTweet";
import PrincipalNav from "./components/PrincipalNav";
import TweetFeed from "./components/TweetFeed";
import { UserProvider } from "./components/CurrentUserContext";
import useCurrentUser from "./hooks/useCurrentUser";
import WhoToFollow from "./components/WhoToFollow";
import SearchBar from "./components/SearchBar";
import CTAPremium from "./components/CTAPremium";
import "./index.css";

function App() {
  return (
    <UserProvider>
      <div className="app-container w-full">
        <header className="hidden lg:flex flex-col items-end ml-60 w-full">
          <PrincipalNav></PrincipalNav>
        </header>
        <main className="w-full">
          <CreateTweet></CreateTweet>
          <TweetFeed></TweetFeed>
        </main>
        <div className="hidden lg:flex flex-col right-container w-full">
          <SearchBar></SearchBar>
          <CTAPremium></CTAPremium>
          <WhoToFollow usernames={["wiskys98", "user2"]}></WhoToFollow>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
