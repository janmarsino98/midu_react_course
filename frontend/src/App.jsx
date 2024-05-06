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
      <div className="app-container w-full flex flex-row justify-center font-seoge box-border">
        <header className="hidden lg:flex flex-col items-end w-max">
          <PrincipalNav></PrincipalNav>
        </header>
        <main className="w-full max-w-screen-sm">
          <CreateTweet></CreateTweet>
          <TweetFeed></TweetFeed>
        </main>
        <div className="hidden lg:flex flex-col right-container w-max mt-1">
          <SearchBar></SearchBar>
          <CTAPremium></CTAPremium>
          <WhoToFollow usernames={["wiskys98", "user2"]}></WhoToFollow>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
