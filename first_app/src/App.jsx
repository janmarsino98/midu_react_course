import "./App.css";
import CreateTweet from "./components/CreateTweet";
import PrincipalNav from "./components/PrincipalNav";
import LastTweets from "./components/LastTweets";
import UserContext from "./components/CurrentUserContext";
import CurrentUserSection from "./components/CurrentUserSection";
import useCurrentUser from "./hooks/useCurrentUser";
import { useEffect } from "react";

function App() {
  const currentUserUsername = "user2";
  const currentUserInfo = useCurrentUser(currentUserUsername);
  useEffect(() => {
    console.log(currentUserInfo);
  }, [currentUserInfo]);
  return (
    <>
      <UserContext.Provider value={currentUserInfo}>
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
