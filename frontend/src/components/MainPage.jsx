import React, { useContext } from "react";
import HeaderNav from "./HeaderNav";
import { TweetsContextProvider } from "./TweetsToDisplayContext";
import SelectSection from "./SelectSection";
import CreateTweet from "./CreateTweet";
import ForYouTweetFeed from "./ForYouTweetFeed";
import LoginBox from "./LoginBox";
import { UserContext } from "./CurrentUserContext";

const MainPage = () => {
  const { currentUser } = useContext(UserContext);

  return currentUser?.username ? (
    <div className="flex flex-row">
      <HeaderNav></HeaderNav>
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
