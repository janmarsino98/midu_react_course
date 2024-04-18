import { useState } from "react";
import "./App.css";
import Usercard from "./components/Usercard";
import TweetFeed from "./components/TweetFeed";
import CreateTweet from "./components/CreateTweet";

function App() {
  return (
    <>
      <CreateTweet></CreateTweet>
      <TweetFeed
        userNumber={35271042}
        name="Name1"
        starting_likes={100}
        starting_retweets={20}
        userName="username"
        tweetText="
        Since in genuinly think karthus is uncontestably the strongest jungler in the game right now (he always was s/s+) but with jinx being such a prominent pick, and him allowing her to get passive with as little as pressing r or 1/2 autos, gonna make a short thread on some tips 4 him"
      ></TweetFeed>
      <TweetFeed
        userNumber={35271041}
        starting_likes={10}
        starting_retweets={0}
        name="Name2"
        userName="username2"
        tweetText="
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem natus, deserunt deleniti eaque eos quam est velit itaque nulla consequuntur aut fuga cumque, facilis quo possimus provident modi. Odio maiores, culpa at quisquam deleniti pariatur. Nesciunt, magnam. Natus, quisquam esse."
      ></TweetFeed>
    </>
  );
}

export default App;
