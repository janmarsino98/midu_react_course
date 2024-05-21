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
import WhoToFollow from "../WhoToFollow";
import RightBar from "../../../components/Sidebar/RightBar";
import DisplayUser from "../../../components/DisplayUser";

const MainPage = () => {
  const { loggedIn, currentUser, loading } = useContext(SessionContext);

  if (loading) {
    return <div className="text-white">Loading</div>;
  } else if (loggedIn === false) {
    return <div className="text-white">There is no user logged</div>;
  }
  return (
    <div className="flex flex-row w-full justify-center mx-0">
      <div className="hidden sm:flex flex-col">
        <HeaderNav></HeaderNav>
        <DisplayUser></DisplayUser>
      </div>
      <TweetsContextProvider>
        <main className="sm:w-[600px]">
          <div>
            <SelectSection></SelectSection>
          </div>
          <div>
            <CreateTweet></CreateTweet>
            <ForYouTweetFeed></ForYouTweetFeed>
          </div>
        </main>
        <RightBar></RightBar>
      </TweetsContextProvider>
    </div>
  );
};

export default MainPage;
