import { useContext, useEffect, useState } from "react";
import HeaderNav from "./HeaderNav";
import { TweetsContextProvider } from "./TweetsToDisplayContext";
import SelectSection from "./SelectSection";
import CreateTweet from "./CreateTweet";
import ForYouTweetFeed from "./ForYouTweetFeed";
import LoginBox from "./LoginBox";
import { UserContext } from "./CurrentUserContext";
import CreateAccount from "./SignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "../../back_address";
import { SessionContext } from "./SessionContext";

const MainPage = () => {
  const { currentUser } = useContext(UserContext);
  const { loggedIn, setLoggedIn } = useContext(SessionContext);
  console.log("Logged: ", loggedIn);
  return loggedIn ? (
    <div className="flex flex-row">
      <HeaderNav></HeaderNav>
      <CreateAccount></CreateAccount>
      <TweetsContextProvider>
        <main className="w-full max-w-screen-sm">
          <SelectSection></SelectSection>
          <CreateTweet></CreateTweet>
          <ForYouTweetFeed></ForYouTweetFeed>
        </main>
      </TweetsContextProvider>
    </div>
  ) : (
    <LoginBox />
  );
};

export default MainPage;
