import "./App.css";
import TweetFeed from "./components/TweetFeed";
import CreateTweet from "./components/CreateTweet";
import PrincipalNav from "./components/PrincipalNav";
import LastTweets from "./components/LastTweets";

function App() {
  return (
    <>
      <header>
        <PrincipalNav></PrincipalNav>
      </header>
      <main>
        <CreateTweet></CreateTweet>
        <LastTweets></LastTweets>
      </main>
    </>
  );
}

export default App;
