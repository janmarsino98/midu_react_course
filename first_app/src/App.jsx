import "./App.css";
import CreateTweet from "./components/CreateTweet";
import PrincipalNav from "./components/PrincipalNav";
import LastTweets from "./components/LastTweets";
import UserContext from "./components/CurrentUserContext";
import CurrentUserSection from "./components/CurrentUserSection";

function App() {
  return (
    <>
      <UserContext.Provider value="user2">
        <header>
          <PrincipalNav></PrincipalNav>
        </header>
        <main>
          <CurrentUserSection></CurrentUserSection>
          <CreateTweet></CreateTweet>
          <LastTweets></LastTweets>
        </main>
      </UserContext.Provider>
    </>
  );
}

export default App;
