import { useContext, useEffect, useState } from "react";
import HeaderNav from "../../../components/Header/HeaderNav";
import { TweetsContextProvider } from "../../../contexts/TweetsToDisplayContext";
import SelectSection from "../../../components/SelectSection";
import CreateTweet from "../../../components/Tweet/CreateTweet";
import ForYouTweetFeed from "../../../components/ForYouTweetFeed";
import LoginBox from "../../LoginPage/LoginBox";
import { UserContext } from "../../../contexts/CurrentUserContext";
import CreateAccount from "../../SignupPage/SignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "../../../../back_address";
import { SessionContext } from "../../../contexts/SessionContext";

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
